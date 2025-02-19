import * as React from 'react';
import styled from 'styled-components';

interface ContainerProps {
    width: number;
    children: React.JSX.Element | React.JSX.Element[];
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
`;

const Container = (props: ContainerProps) => {
    const { width, children } = props;

    return (
        <StyledContainer width={width}>
            {children}
        </StyledContainer>
    );
}

export default Container;