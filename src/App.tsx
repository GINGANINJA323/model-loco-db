import * as React from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { LightTrain } from './types';
import Sidebar from './components/sidebar';
import ViewPanel from './components/view-panel';

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

    return (
        <AppContainer>
            <Header />
            <ContentComposer>
                <Sidebar trains={trains.map(t => ({ name: `${t.trainClass} "${t.trainName}"`, id: t.id, onClick: () => setSelectedTrain(t.id) }))} />
                <ViewPanel id={selectedTrain} />
            </ContentComposer>
        </AppContainer>
    );
}

export default App;