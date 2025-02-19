import * as React from 'react';
import styled from 'styled-components';

interface HeaderProps {
    title?: string;
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
`;

const Header = (props: HeaderProps) => {
    const { title = 'Model Locomotive Database' } = props;
    
    return (
        <HeaderContainer>
            <h1>{title}</h1>
        </HeaderContainer>
    );
}

export default Header;