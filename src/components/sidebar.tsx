import * as React from 'react';
import Container from './container';
import styled from 'styled-components';
import { SidebarOption } from '../types';

interface SidebarProps {
    trains: SidebarOption[]
    openModal: () => void;
}

const SidebarButton = styled.button`
    border: none;
    width: 100%;
    padding: 5px 0px;
    background-color: #FFFFFF;
    font-size: 18px;

    &:hover {
        cursor: pointer;
        background-color: #dbdbdb;
    }
`;

const Sidebar = (props: SidebarProps) => {
    const { trains, openModal } = props;

    return (
        <Container width={30} id={'sidebar'} additionalStyles={'display: flex; flex-direction: column; justify-content: space-between;'}>
            <div>
            {
                trains.map(t => <SidebarButton key={t.id} id={t.id} onClick={t.onClick}>{t.name}</SidebarButton>)
            }
            </div>
            <div>
                <SidebarButton onClick={openModal}><strong>Add new train</strong></SidebarButton>
            </div>
        </Container>
    );
}

export default Sidebar;