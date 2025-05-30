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
    trainLastServiced: string;
    trainRunningTime: string;
    trainImage?: string;
}

export interface LightTrain {
    id: string;
    trainClass: string;
    trainName: string;
}

export interface SidebarOption {
    id: string;
    name: string;
    onClick: () => void;
}

export interface ContextOption {
    label: string;
    onClick: (trainId: string) => void;
}

export interface ThemeContextType {
    selectedPrimary: string;
    selectedBackground: string;
    setSelectedPrimary: (theme: string) => void;
    setSelectedBackground: (theme: string) => void;
}

export interface WithThemeProps {
    bgColour: string;
    textColour: string;
    hoverColour?: string;
}