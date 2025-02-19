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
    const { trains } = props;

    return (
        <Container width={30}>
            {
                trains.map(t => <SidebarButton onClick={t.onClick}>{t.name}</SidebarButton>)
            }
        </Container>
    );
}

export default Sidebar;