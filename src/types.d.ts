import { DccStatus } from "./enums";

export interface Train {
    id: string;
    trainClass: string;
    trainName: string;
    trainManufacturer: string;
    trainCode: string;
    trainDccAddress: string;
    trainLivery: string;
    trainDccStatus: DccStatus;
    trainGauge: string;
    trainWhyteDesignation: string;
    trainManufacturerCode: string;
}

export interface LightTrain {
    id: string;
    trainClass: string;
    trainName: string;
}