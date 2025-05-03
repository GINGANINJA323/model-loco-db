import * as React from 'react';
import Container from './container';
import styled from 'styled-components';
import { SidebarOption, WithThemeProps } from '../types';
import ThemeContext from '../context/ThemeContext';
import { themesPrimary } from '../constants';

interface SidebarProps {
    trains: SidebarOption[]
    openModal: () => void;
}

const SidebarButton = styled.button<WithThemeProps>`
    border: none;
    width: 100%;
    padding: 5px 0px;
    background-color: ${props => props.bgColour};
    color: ${props => props.textColour};
    font-size: 18px;

    &:hover {
        cursor: pointer;
        background-color: ${props => props.hoverColour};
    }
`;

const Sidebar = (props: SidebarProps) => {
    const { trains, openModal } = props;

    const { selectedPrimary } = React.useContext(ThemeContext);
    const { fore, text, hover } = themesPrimary[selectedPrimary];

    return (
        <Container width={30} id={'sidebar'} additionalStyles={'display: flex; flex-direction: column; justify-content: space-between;'}>
            <div>
            {
                trains.map(t => <SidebarButton hoverColour={hover} textColour={text} bgColour={fore} key={t.id} id={t.id} onClick={t.onClick}>{t.name}</SidebarButton>)
            }
            </div>
            <div>
                <SidebarButton hoverColour={hover} textColour={text} bgColour={fore} onClick={openModal}><strong>Add new train</strong></SidebarButton>
            </div>
        </Container>
    );
}

export default Sidebar;