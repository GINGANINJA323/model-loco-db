import * as React from 'react';
import styled from 'styled-components';

interface CollapsibleProps {
    label: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const CollapsibleHeader = styled.div`
    display: flex;
    flex-direction: row;

    &:hover {
        cursor: pointer;
    }
`;

const Collapsible = (props: CollapsibleProps) => {
    const { label, children, defaultOpen = false } = props;
    const [open, setOpen] = React.useState(defaultOpen);

    return (
        <>
            <CollapsibleHeader onClick={() => setOpen(!open)}>
                <h3>{label}</h3>
            </CollapsibleHeader>
            {
                open ? children : null
            }
        </>
    );
}

export default Collapsible;