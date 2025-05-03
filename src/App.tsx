import * as React from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { LightTrain, Train } from './types';
import Sidebar from './components/sidebar';
import ViewPanel from './components/view-panel';
import TrainModal from './components/new-train-modal';
import ContextMenu from './components/context-menu';
import { devices } from './constants';
import TrainDropdown from './components/train-dropdown';
import ThemeContext from './context/ThemeContext';
import { themesBackground } from './constants';

const AppContainer = styled.div<{ colour: string }>`
    background-color: ${(props) => props.colour};
    height: 100vh;
`;

const ContentComposer = styled.div`
    display: flex;
    height: calc(100% - 100px);

    @media screen and ${devices.mobile} {
        flex-direction: column;
    }

    @media screen and ${devices.desktop} {
        flex-direction: row;
    }
`;

const App = () => {
    const [trains, setTrains] = React.useState<LightTrain[]>([]);
    const [selectedTrain, setSelectedTrain] = React.useState('');
    const [ntmOpen, setNtmOpen] = React.useState(false);
    const [etmOpen, setEtmOpen] = React.useState(false);
    const [editTrain, setEditTrain] = React.useState<string>();
    const [themePrimary, setThemePrimary] = React.useState('light');
    const [themeBackground, setThemeBackground] = React.useState('brIntercityBlue');

    const ntmRef = React.useRef<HTMLDialogElement>(null);
    const etmRef = React.useRef<HTMLDialogElement>(null);

    const getAllTrains = async() => {
        const response = await fetch('/api/all-trains');

        if (!response.ok) {
            console.log('Failed to get trains', response.status);
        } else {
            const data = await response.json();

            setTrains(data);
        }
    }

    React.useEffect(() => {
        getAllTrains();
    }, []);

    React.useEffect(() => {
        if (trains.length) {
            setSelectedTrain(trains[0].id);
        }
    }, [trains]);

    React.useLayoutEffect(() => {
        if (ntmRef.current?.open && !ntmOpen) {
            ntmRef.current?.close();
        } if (!ntmRef.current?.open && ntmOpen) {
            ntmRef.current?.showModal();
        }
    }, [ntmOpen]);

    React.useLayoutEffect(() => {
        if (etmRef.current?.open && !etmOpen) {
            etmRef.current?.close();
        } if (!etmRef.current?.open && etmOpen) {
            etmRef.current?.showModal();
        }
    }, [etmOpen]);

    const addTrain = async(train: Train, image?: File) => {
        const response = await fetch('/api/new-train', {
            method: 'POST',
            body: JSON.stringify(train),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Failed to add new train:', response.status);
            return;
        }

        const newId = await response.text();

        if (image) {
            await uploadTrainImage(newId, image);
        } else {
            window.location.reload();
        }


    }

    const updateTrain = async(train: Train, image?: File) => {
        console.log('Image:', image);
        const response = await fetch('/api/edit-train', {
            method: 'POST',
            body: JSON.stringify(train),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Failed to update train:', response.status);
            return;
        }

        if (image) {
            await uploadTrainImage(train.id, image);
        } else {
            window.location.reload();
        }

    }

    const deleteTrain = async(id: string) => {
        if (!confirm('Are you sure you want to delete this train?')) {
            return;
        }
        
        const response = await fetch(`/api/delete-train/${id}`);

        if (!response.ok) {
            console.log('Failed to delete train:', response.status);
            return;
        }

        window.location.reload();
    }

    const uploadTrainImage = async(id: string, file: File) => {
        const form = new FormData();
        form.append('image', file);
        const response = await fetch(`/api/upload-image/${id}`, {
            method: 'POST',
            // @ts-ignore
            body: form
        });

        if (!response.ok) {
            console.log('Failed to upload image:', response.status);
        }

        window.location.reload();
    }

    const contextOptions = [
        {
            label: 'Edit Train',
            onClick: (trainId: string) => {
                setEditTrain(trainId);
                setEtmOpen(true);
            }
        },
        {
            label: 'Delete Train',
            onClick: deleteTrain
        }
    ]

    const themeContextValue = {
        selectedPrimary: themePrimary,
        selectedBackground: themeBackground,
        setSelectedPrimary: setThemePrimary,
        setSelectedBackground: setThemeBackground
    }

    return (
        <AppContainer id={'main'} colour={themesBackground[themeBackground].code}>
            <ThemeContext.Provider value={themeContextValue}>
                <Header />
                <ContentComposer>
                    {
                        window.innerWidth < 801 ? <TrainDropdown trains={trains.map(t => ({ name: `${t.trainClass} ${t.trainName ? `"${t.trainName}"` : ''}`, id: t.id, onClick: () => setSelectedTrain(t.id) }))} contextOptions={contextOptions} /> :
                        <Sidebar
                            openModal={() => setNtmOpen(true)}
                            trains={trains.map(t => ({ name: `${t.trainClass} ${t.trainName ? `"${t.trainName}"` : ''}`, id: t.id, onClick: () => setSelectedTrain(t.id) }))}
                        />
                    }
                    <ViewPanel id={selectedTrain} />
                </ContentComposer>
                <TrainModal id={'new-train-modal'} title={'Add new train'} submit={addTrain} closeModal={() => setNtmOpen(false)} ref={ntmRef} />
                <TrainModal prefillTrain={editTrain} id={'edit-train-modal'} title={'Edit Train'} submit={updateTrain} closeModal={() => setEtmOpen(false)} ref={etmRef} />
                <ContextMenu validTargets={trains.map(t => t.id)} options={contextOptions} target='main' />
            </ThemeContext.Provider>
        </AppContainer>
    );
}

export default App;