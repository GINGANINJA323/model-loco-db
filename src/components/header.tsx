import * as React from 'react';
import styled from 'styled-components';
import { Heading1 } from './common';

interface HeaderProps {
    title?: string;
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    height: 80px;
`;

const Header = (props: HeaderProps) => {
    const { title = 'Model Locomotive Database' } = props;
    
    return (
        <HeaderContainer>
            <Heading1>{title}</Heading1>
        </HeaderContainer>
    );
}

export default Header;