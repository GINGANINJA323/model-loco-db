import * as React from 'react';
import styled from 'styled-components';
import Container from './container';
import { Train } from '../types';
import { DccStatus } from '../enums';

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

    const keyLabelMap: { [key: string]: string } = {
        trainClass: 'Class',
        trainName: 'Name',
        trainManufacturer: 'Manufacturer',
        trainCode: 'Code',
        trainDccStatus: 'DCC Status',
        trainDccAddress: 'DCC Address',
        trainLivery: 'Livery',
        trainGauge: 'Gauge',
        trainWhyteDesignation: 'Wheel Formation',
        trainManufacturerCode: 'Product Code'
    }

    return (
        <Container width={70}>
            {
                trainData ? 
                    <>
                        <h2>{`${trainData.trainManufacturer} ${trainData.trainClass} ${trainData.trainWhyteDesignation} ${trainData.trainName ? `"${trainData.trainName}"` : ''}`}</h2>
                        <Table>
                            {
                                Object.keys(keyLabelMap).map((k) =>
                                    k === 'trainDccAddress' && trainData['trainDccStatus'] === DccStatus.Incompatible ? 
                                        null : 
                                        <TableRow>
                                            <p>{keyLabelMap[k]}</p>
                                            {/* @ts-ignore - need to hard type this */}
                                            <p>{trainData[k]}</p>
                                        </TableRow>
                                )
                            }
                        </Table>
                    </> :
                    <p>Select a train to continue...</p>
            }
        </Container>
    );
}

export default ViewPanel;