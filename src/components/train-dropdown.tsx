import * as React from 'react';
import styled from 'styled-components';

import { SidebarOption } from '../types';
import { ContextOption } from '../types';

interface TrainDropdownProps {
    trains: SidebarOption[];
    contextOptions: ContextOption[];
}

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 0px;
    justify-content: space-between;
`;

const ContextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Dropdown = styled.select``;

const TrainDropdown = (props: TrainDropdownProps) => {
    const { trains, contextOptions } = props;
    const [selected, setSelected] = React.useState('');

    const handleSelectTrain = (t: SidebarOption) => {
        setSelected(t.id);
        t.onClick();
    }

    React.useEffect(() => {
        if (trains && !selected) {
            setSelected(trains[0]?.id);
        }
    }, [trains])

    return (
        <DropdownContainer>
            <Dropdown>
                {
                    trains.map(t => (
                        <option key={t.id} onClick={() => handleSelectTrain(t)}>{t.name}</option>
                    ))
                }
            </Dropdown>
            <ContextContainer>
                {
                    contextOptions.map(c => <button key={c.label} onClick={() => c.onClick(selected)}>{c.label}</button>)
                }
            </ContextContainer>
        </DropdownContainer>
    )
}

export default TrainDropdown;