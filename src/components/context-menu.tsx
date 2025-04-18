import * as React from 'react'
import styled from 'styled-components'
import { ContextOption } from '../types';

interface ContextMenuProps {
    options: ContextOption[];
    target: string;
    validTargets: string[];
}

const ContextMenuContainer = styled.div<{ coords: number[] }>`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: ${props => props.coords[0]}px;
    top: ${props => props.coords[1]}px;
    width: 100px;
    background-color: #FFFFFF;
    border: 1px solid #000000;
`;

const ContextItem = styled.button`
    border: none;
    padding: 5px;

    &:hover {
        cursor: pointer;
    }
`;

const ContextMenu = (props: ContextMenuProps) => {
    const { options, target, validTargets } = props;
    const [show, setShow] = React.useState(false);
    const [coords, setCoords] = React.useState<number[]>([]);
    const [evtTarget, setEvtTarget] = React.useState('');

    const handleChangeShow = (e: MouseEvent) => {
        // @ts-ignore - There is an ID, just not in the type
        if (validTargets.includes(e.target?.id)) {
            e.preventDefault();
            if (!show) {
                setCoords([e.clientX, e.clientY]);
                // @ts-ignore - There is an ID, just not in the type
                setEvtTarget(e.target?.id);
            }
            setShow(!show);
        } else {
            console.log('Else!');
            setShow(false);
        }
    };

    const handleClick = (e: MouseEvent) => {
        const validClickTargets = [...validTargets, ...options.map(o => o.label)];
        // @ts-ignore
        if (!validClickTargets.includes(e.target?.id)) {
            setShow(false);
        }
    }

    React.useLayoutEffect(() => {
        const el = document.getElementById(target);

        if (!el) {
            throw new Error('Could not find element');
        }

        el.addEventListener('contextmenu', handleChangeShow);
        el.addEventListener('mousedown', handleClick);

        return () => {
            el.removeEventListener('contextmenu', handleChangeShow);
            el.addEventListener('mousedown', handleClick);
        }
    }, [show, validTargets]);

    if (!show) {
        return null;
    }

    const handleOptionClick = (trainId: string, fn: (trainId: string) => void) => {
        fn(trainId);
        setShow(false);
    }

    return (
        <ContextMenuContainer coords={coords}>
            {
                options.map(o => (
                    // @ts-ignore
                    <ContextItem id={o.label} onClick={(e: React.MouseEvent) => handleOptionClick(evtTarget, o.onClick)}>{o.label}</ContextItem>
                ))
            }
        </ContextMenuContainer>
    );
}

export default ContextMenu;