import * as React from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { LightTrain, Train } from './types';
import Sidebar from './components/sidebar';
import ViewPanel from './components/view-panel';
import TrainModal from './components/new-train-modal';
import ContextMenu from './components/context-menu';

const AppContainer = styled.div`
    background-color: #dbdbdb;
    height: 100vh;
`;

const ContentComposer = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100% - 100px);
`

const App = () => {
    const [trains, setTrains] = React.useState<LightTrain[]>([]);
    const [selectedTrain, setSelectedTrain] = React.useState('');
    const [ntmOpen, setNtmOpen] = React.useState(false);

    const ntmRef = React.useRef<HTMLDialogElement>(null);

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

    const addTrain = async(train: Train) => {
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

        window.location.reload();
    }

    const contextOptions = [
        {
            label: 'Edit Train',
            onClick: () => console.log('Edit train clicked')
        },
        {
            label: 'Delete Train',
            onClick: () => console.log('delete train clicked')
        }
    ]

    return (
        <AppContainer id={'main'}>
            <Header />
            <ContentComposer>
                <Sidebar openModal={() => setNtmOpen(true)} trains={trains.map(t => ({ name: `${t.trainClass} ${t.trainName ? `"${t.trainName}"` : ''}`, id: t.id, onClick: () => setSelectedTrain(t.id) }))} />
                <ViewPanel id={selectedTrain} />
            </ContentComposer>
            <TrainModal id={'new-train-modal'} title={'Add new train'} submit={addTrain} closeModal={() => setNtmOpen(false)} ref={ntmRef} />
            <ContextMenu validTargets={trains.map(t => t.id)} options={contextOptions} target='main' />
        </AppContainer>
    );
}

export default App;