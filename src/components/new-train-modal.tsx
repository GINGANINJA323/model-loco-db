import * as React from 'react';
import styled from 'styled-components';
import { Train } from '../types';
import { DccStatus } from '../enums';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

interface TrainModalProps {
    title: string;
    ref: React.Ref<HTMLDialogElement>;
    submit: (trainData: Train) => void;
    id: string;
    closeModal: () => void;
    prefillTrain?: string;
}

type FieldValue<T = Train> = {
    [K in keyof T]-?: T[K]
}[keyof T];

const DialogContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

const TrainModal = (props: TrainModalProps) => {
    const { ref, title, submit, id, closeModal, prefillTrain = '' } = props;

    const [trainData, setTrainData] = React.useState<Train>({
        id: '',
        trainClass: '',
        trainName: '',
        trainManufacturer: '',
        trainCode: '',
        trainDccAddress: '',
        trainLivery: '',
        trainDccStatus: DccStatus.Incompatible,
        trainGauge: '',
        trainWhyteDesignation: '',
        trainManufacturerCode: '',
        trainLastServiced: '',
        trainRunningTime: ''
    });

    const onChangeField = (field: keyof Train, value: FieldValue) => {
        if (!Object.keys(trainData).includes(field)) {
            console.log('Invalid key for object:', field);
            return;
        }

        const newData = { ...trainData };
        // @ts-ignore - check the FieldValue type
        newData[field] = value;

        setTrainData(newData);
    }

    const getTrainData = async() => {
        const response = await fetch(`/api/get-train/${prefillTrain}`);

        if (!response.ok) {
            console.log('Failed to get train', response.status);
        } else {
            const data = await response.json();

            setTrainData(data);
        }
    }

    React.useEffect(() => {
        if (prefillTrain) {
            getTrainData();
        }
    }, [prefillTrain]);

    return (
        <dialog ref={ref} id={id}>
            <h1>{title}</h1>
            <DialogContent>
                <label htmlFor='name'>Train Name:</label>
                <input id='name' value={trainData.trainName} onChange={(e) => onChangeField('trainName', e.target.value)}></input>

                <label htmlFor='class'>Train Class:</label>
                <input id='class' value={trainData.trainClass} onChange={(e) => onChangeField('trainClass', e.target.value)}></input>

                <label htmlFor='manufacturer'>Train Manufacturer:</label>
                <input id='manufacturer' value={trainData.trainManufacturer} onChange={(e) => onChangeField('trainManufacturer', e.target.value)}></input>

                <label htmlFor='code'>Train Code:</label>
                <input id='code' value={trainData.trainCode} onChange={(e) => onChangeField('trainCode', e.target.value)}></input>

                <label htmlFor='dccStatus'>Train DCC Status:</label>
                <select id='dccStatus' onChange={(e) => onChangeField('trainDccStatus', e.target.value)}>
                    <option selected={trainData.trainDccStatus === 'Incompatible'} value={DccStatus.Incompatible}>Incompatible</option>
                    <option selected={trainData.trainDccStatus === 'Ready'} value={DccStatus.Ready}>Ready</option>
                    <option selected={trainData.trainDccStatus === 'Fitted'} value={DccStatus.Fitted}>Fitted</option>
                </select>

                <label htmlFor='dccAddress'>Train DCC Address:</label>
                <input id='dccAddress' value={trainData.trainDccAddress} disabled={trainData.trainDccStatus !== DccStatus.Fitted} onChange={(e) => onChangeField('trainDccAddress', e.target.value)}></input>

                <label htmlFor='livery'>Train Livery:</label>
                <input id='livery' value={trainData.trainLivery} onChange={(e) => onChangeField('trainLivery', e.target.value)}></input>

                <label htmlFor='gauge'>Train Gauge:</label>
                <input id='gauge' value={trainData.trainGauge} onChange={(e) => onChangeField('trainGauge', e.target.value)}></input>

                <label htmlFor='whyte'>Train Whyte:</label>
                <input id='whyte' value={trainData.trainWhyteDesignation} onChange={(e) => onChangeField('trainWhyteDesignation', e.target.value)}></input>

                <label htmlFor='manufacturerCode'>Manufacturer Code/SKU:</label>
                <input id='manufacturerCode' value={trainData.trainManufacturerCode} onChange={(e) => onChangeField('trainManufacturerCode', e.target.value)}></input>

                <label htmlFor='lastServiceDate'>Last Service Date:</label>
                <DatePicker selected={trainData.trainLastServiced ? new Date(trainData.trainLastServiced) : new Date()} onChange={(date) => onChangeField('trainLastServiced', date?.toISOString() || '')} />

                <label htmlFor='runningTime'>Running time:</label>
                <input id={'runningTime'} value={trainData.trainRunningTime} onChange={(e) => onChangeField('trainRunningTime', e.target.value)} type='time'></input>

                <ButtonRow>
                    <button onClick={closeModal}>Close</button>
                    <button onClick={() => submit(trainData)}>Submit</button>
                </ButtonRow>
            </DialogContent>
        </dialog>
    );
}

export default TrainModal;