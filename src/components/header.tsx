import * as React from 'react';
import styled from 'styled-components';
import { Heading1 } from './common';
import ThemeSelector from './theme-selector';
import ThemeContext from '../context/ThemeContext';
import { themesPrimary } from '../constants';

interface HeaderProps {
    title?: string;
}

const HeaderContainer = styled.div<{ bgColour: string, textColour: string }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColour};
    color: ${props => props.textColour};
    height: 80px;
`;

const Header = (props: HeaderProps) => {
    const { title = 'Model Locomotive Database' } = props;
    const { selectedPrimary } = React.useContext(ThemeContext);
    const { fore, text } = themesPrimary[selectedPrimary];
    
    return (
        <HeaderContainer bgColour={fore} textColour={text}>
            <Heading1>{title}</Heading1>
            <ThemeSelector />
        </HeaderContainer>
    );
}

export default Header;