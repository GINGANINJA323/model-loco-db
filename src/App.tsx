import * as React from 'react';
import Header from './components/header';
import styled from 'styled-components';
import Container from './components/container';
import { Train } from './types';

const AppContainer = styled.div`
    background-color: #dbdbdb;
    height: 100vh;
`;

const App = () => {
    const [trains, setTrains] = React.useState<Train[]>([]);

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
            
        </AppContainer>
    );
}

export default App;