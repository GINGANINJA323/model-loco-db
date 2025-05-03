import * as React from 'react';
import styled from 'styled-components';
import { devices, themesPrimary } from '../constants';
import ThemeContext from '../context/ThemeContext';

interface ContainerProps {
    width: number;
    children: React.ReactNode
    id?: string;
    additionalStyles?: string;
}

interface StyledContainerProps {
    width: number;
    additionalStyles?: string;
    bgColour: string;
    textColour: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
    background-color: ${props => props.bgColour};
    color: ${props => props.textColour};
    width: ${props => props.width}%;
    border-radius: 10px;
    overflow: scroll;
    ${props => props.additionalStyles ? props.additionalStyles : ''};

    @media screen and ${devices.desktop} {
        padding: 5px 20px;
        margin: 10px 10px;
    }
`;

const Container = (props: ContainerProps) => {
    const { width, children, id = '', additionalStyles } = props;

    const { selectedPrimary } = React.useContext(ThemeContext);
    const { fore, text } = themesPrimary[selectedPrimary];

    return (
        <StyledContainer
            id={id}
            width={width}
            additionalStyles={additionalStyles}
            bgColour={fore}
            textColour={text}
        >
            {children}
        </StyledContainer>
    );
}

export default Container;