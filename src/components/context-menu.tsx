import * as React from 'react'
import styled from 'styled-components'

interface ContextOption {
    label: string;
    onClick: () => void;
}

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
        console.log(validTargets);
        // @ts-ignore - There is an ID, just not in the type
        if (validTargets.includes(e.target?.id)) {
            e.preventDefault();
            if (!show) {
                setCoords([e.clientX, e.clientY]);
                console.log(e.target);
                // @ts-ignore - There is an ID, just not in the type
                setEvtTarget(e.target?.id);
            }
            setShow(!show);
        } else {
            setShow(false);
        }
    };

    const handleClick = (e: MouseEvent) => {
        // @ts-ignore
        if (!validTargets.includes(e.target?.id)) {
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

    const handleOptionClick = (fn: () => void) => {
        fn();
        setShow(false);
    }

    return (
        <ContextMenuContainer coords={coords}>
            {
                options.map(o => (
                    <ContextItem onClick={() => handleOptionClick(o.onClick)}>{o.label}</ContextItem>
                ))
            }
        </ContextMenuContainer>
    );
}

export default ContextMenu;