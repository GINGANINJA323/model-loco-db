import * as React from 'react';
import Container from './container';
import styled from 'styled-components';

interface Train {
    id: string;
    name: string;
    onClick: () => void;
}

interface SidebarProps {
    trains: Train[]
    openModal: () => void;
}

const SidebarButton = styled.button`
    border: none;
    width: 100%;
    padding: 5px 0px;
    background-color: #FFFFFF;

    &:hover {
        cursor: pointer;
        background-color: #dbdbdb;
    }
`;

const Sidebar = (props: SidebarProps) => {
    const { trains, openModal } = props;

    return (
        <Container width={30} id={'sidebar'}>
            {
                trains.map(t => <SidebarButton key={t.id} id={t.id} onClick={t.onClick}>{t.name}</SidebarButton>)
            }
            <SidebarButton onClick={openModal}>Add new train</SidebarButton>
        </Container>
    );
}

export default Sidebar;