import * as React from 'react';
import styled from 'styled-components';
import Container from './container';
import { Train } from '../types';
import { DccStatus } from '../enums';
import Collapsible from './collapsible';
import TrainImage from './train-image';
import { Heading2, Text } from './common';

interface ViewPanelProps {
    id: string;
}

const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const TableRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

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

    const trainKeyLabelMap: { [key: string]: string } = {
        trainClass: 'Class',
        trainName: 'Name',
        trainCode: 'Code',
        trainLivery: 'Livery',
        trainWhyteDesignation: 'Wheel Formation',
    }

    const modelKeyLabelMap: { [key: string]: string } = {
        trainManufacturer: 'Manufacturer',
        trainDccStatus: 'DCC Status',
        trainDccAddress: 'DCC Address',
        trainGauge: 'Gauge',
        trainManufacturerCode: 'Product Code'
    }

    const serviceKeyLabelMap: { [key: string]: string } = {
        trainRunningTime: 'Train Running Time',
        trainLastServiced: 'Last Service Date'
    }

    return (
        <Container width={70}>
            {
                trainData ? 
                    <>
                        <Heading2>{`${trainData.trainManufacturer} ${trainData.trainClass} ${trainData.trainWhyteDesignation} ${trainData.trainName ? `"${trainData.trainName}"` : ''}`}</Heading2>
                        {
                            trainData.trainImage ? <TrainImage id={trainData.id} /> : null
                        }
                        <Collapsible label={'Locomotive Information'} defaultOpen>
                            <Table>
                                {
                                    Object.keys(trainKeyLabelMap).map((k) =>
                                        <TableRow>
                                            <Text>{trainKeyLabelMap[k]}</Text>
                                            {/* @ts-ignore - need to hard type this */}
                                            <Text>{trainData[k]}</Text>
                                        </TableRow>
                                    )
                                }
                            </Table>
                        </Collapsible>
                        <Collapsible label={'Model Information'}>
                            <Table>
                                {
                                    Object.keys(modelKeyLabelMap).map((k) =>
                                        k === 'trainDccAddress' && trainData['trainDccStatus'] !== DccStatus.Fitted ? 
                                            null : 
                                            <TableRow>
                                                <Text>{modelKeyLabelMap[k]}</Text>
                                                {/* @ts-ignore - need to hard type this */}
                                                <Text>{trainData[k]}</Text>
                                            </TableRow>
                                    )
                                }
                            </Table>
                        </Collapsible>
                        <Collapsible label='Service Information'>
                            <Table>
                                {
                                    Object.keys(serviceKeyLabelMap).map((k) =>
                                        k === 'trainDccAddress' && trainData['trainDccStatus'] !== DccStatus.Fitted ? 
                                            null : 
                                            <TableRow>
                                                <Text>{serviceKeyLabelMap[k]}</Text>
                                                {/* @ts-ignore - need to hard type this */}
                                                <Text>{trainData[k]}</Text>
                                            </TableRow>
                                    )
                                }
                            </Table>
                        </Collapsible>
                    </> :
                    <Text>Select a train to continue...</Text>
            }
        </Container>
    );
}

export default ViewPanel;