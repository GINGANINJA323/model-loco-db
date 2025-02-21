import * as React from 'react';
import styled from 'styled-components';

interface ContainerProps {
    width: number;
    children: React.ReactNode
    id?: string;
}

interface StyledContainerProps {
    width: number;
}

const StyledContainer = styled.div<StyledContainerProps>`
    background-color: #FFF;
    width: ${props => props.width}%;
    padding: 5px 0px;
    margin: 10px 10px;
    border-radius: 10px;
    overflow: scroll;
`;

const Container = (props: ContainerProps) => {
    const { width, children, id = '' } = props;

    return (
        <StyledContainer id={id} width={width}>
            {children}
        </StyledContainer>
    );
}

export default Container;