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