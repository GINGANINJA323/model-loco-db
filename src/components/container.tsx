import * as React from 'react';
import styled from 'styled-components';

interface ContainerProps {
    width: number;
    children: React.ReactNode
    id?: string;
    additionalStyles?: string;
}

interface StyledContainerProps {
    width: number;
    additionalStyles?: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
    background-color: #FFFFFF;
    width: ${props => props.width}%;
    padding: 5px 20px;
    margin: 10px 10px;
    border-radius: 10px;
    overflow: scroll;
    ${props => props.additionalStyles ? props.additionalStyles : ''};
`;

const Container = (props: ContainerProps) => {
    const { width, children, id = '', additionalStyles } = props;

    return (
        <StyledContainer
            id={id}
            width={width}
            additionalStyles={additionalStyles}
        >
            {children}
        </StyledContainer>
    );
}

export default Container;