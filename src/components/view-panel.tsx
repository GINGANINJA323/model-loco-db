import * as React from 'react';
import styled from 'styled-components';
import Container from './container';
import { Train } from '../types';

interface ViewPanelProps {
    id: string;
}

const ViewPanel = (props: ViewPanelProps) => {
    const { id } = props;
    const [trainData, setTrainData] = React.useState<Train>();

    const getTrainData = async() => {
        const response = await fetch(`/api/get-train/${id}`);

        if (!response.ok) {
            console.log('Failed to get train', response.status);
        } else {
            const data = await response.json();

            setTrainData(data);
        }
    }

    React.useEffect(() => {
        getTrainData();
    }, [id]);

    return (
        <Container width={70}>
            {
                trainData ? 
                    <>
                        <h2>{`${trainData.trainClass} "${trainData.trainName}"`}</h2>
                        <p>{trainData.trainManufacturer}</p>
                        <p>{trainData.trainCode}</p>
                        <p>{trainData.trainDccAddress}</p>
                    </> :
                    <p>Select a train to continue...</p>
            }
        </Container>
    );
}

export default ViewPanel;