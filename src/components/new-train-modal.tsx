import * as React from 'react';
import styled from 'styled-components';
import { Train } from '../types';
import { DccStatus } from '../enums';

interface TrainModalProps {
    title: string;
    ref: React.Ref<HTMLDialogElement>;
    submit: (trainData: Train) => void;
    id: string;
    closeModal: () => void;
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
    const { ref, title, submit, id, closeModal } = props;

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

    return (
        <dialog ref={ref} id={id}>
            <h1>{title}</h1>
            <DialogContent>
                <label htmlFor='name'>Train Name:</label>
                <input id='name' onChange={(e) => onChangeField('trainName', e.target.value)}></input>

                <label htmlFor='class'>Train Class:</label>
                <input id='class' onChange={(e) => onChangeField('trainClass', e.target.value)}></input>

                <label htmlFor='manufacturer'>Train Manufacturer:</label>
                <input id='manufacturer' onChange={(e) => onChangeField('trainManufacturer', e.target.value)}></input>

                <label htmlFor='code'>Train Code:</label>
                <input id='code' onChange={(e) => onChangeField('trainCode', e.target.value)}></input>

                <label htmlFor='dccStatus'>Train DCC Status:</label>
                <select id='dccStatus' onChange={(e) => onChangeField('trainDccStatus', e.target.value)}>
                    <option value={DccStatus.Incompatible}>Incompatible</option>
                    <option value={DccStatus.Ready}>Ready</option>
                    <option value={DccStatus.Fitted}>Fitted</option>
                </select>

                <label htmlFor='dccAddress'>Train DCC Address:</label>
                <input id='dccAddress' disabled={trainData.trainDccStatus !== DccStatus.Fitted} onChange={(e) => onChangeField('trainDccAddress', e.target.value)}></input>

                <label htmlFor='livery'>Train Livery:</label>
                <input id='livery' onChange={(e) => onChangeField('trainLivery', e.target.value)}></input>

                <label htmlFor='gauge'>Train Gauge:</label>
                <input id='gauge' onChange={(e) => onChangeField('trainGauge', e.target.value)}></input>

                <label htmlFor='whyte'>Train Whyte:</label>
                <input id='whyte' onChange={(e) => onChangeField('trainWhyteDesignation', e.target.value)}></input>

                <label htmlFor='manufacturerCode'>Manufacturer Code/SKU:</label>
                <input id='manufacturerCode' onChange={(e) => onChangeField('trainManufacturerCode', e.target.value)}></input>

                <ButtonRow>
                    <button onClick={closeModal}>Close</button>
                    <button onClick={() => submit(trainData)}>Submit</button>
                </ButtonRow>
            </DialogContent>
        </dialog>
    );
}

export default TrainModal;