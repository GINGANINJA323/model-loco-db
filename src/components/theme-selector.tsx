import * as React from 'react';
import styled from 'styled-components';
import { themesBackground, themesPrimary } from '../constants';
import ThemeContext from '../context/ThemeContext';
import { WithThemeProps } from '../types';

const PopoverMenu = styled.div<WithThemeProps>`
    position: absolute;
    border-radius: 5px;
    background-color: ${props => props.bgColour};
    color: ${props => props.textColour};
    display: flex;
    flex-direction: column;
    width: 200px;
    border: 1px solid black;
    left: -60px;
    justify-content: center;
    top: 40px;
    padding: 10px;
`;

const ThemeContainer = styled.div`
    position: absolute;
    left: 90%;
`;

const ThemeColourGrid = styled.div`
    display: flex;
`;

const ThemeSquare = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid black;
    flex: 1;
    margin: 0px 10px;
    &:hover {
        cursor: pointer;
    }
`;

const ThemeButton = styled.button<WithThemeProps>`
    border: none;
    background-color: ${props => props.bgColour};
    color: ${props => props.textColour};
    font-size: 20px;
    &:hover {
        background-color: ${props => props.hoverColour};
        cursor: pointer;
    }
`;

const ThemeSelector = () => {
    const [isThemeOpen, setIsThemeOpen] = React.useState(false);
    const {
        selectedPrimary,
        setSelectedPrimary,
        setSelectedBackground
    } = React.useContext(ThemeContext);
    const { fore, text, hover } = themesPrimary[selectedPrimary];

    const handleOutsideClick = (e: MouseEvent) => {
        console.log('Handler called');
        const el = document.getElementById('theme-popover');
        if (!el) throw new Error('No popover found...');

        // @ts-ignore - ID is present but not in the type
        if (e.target && !el.contains(e.target) && e.target?.id !== 'theme-selector-button') setIsThemeOpen(false);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        console.log(e.key);
        if (e.key === 'Escape') setIsThemeOpen(false);
    }

    React.useLayoutEffect(() => {
        if (isThemeOpen) {
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleKeyPress);

            return () => {
                document.removeEventListener('click', handleOutsideClick);
                document.removeEventListener('keydown', handleKeyPress);
            }
        }
    }, [isThemeOpen])

    return (
        <ThemeContainer>
            <ThemeButton id='theme-selector-button' hoverColour={hover} bgColour={fore} textColour={text} onClick={() => setIsThemeOpen(!isThemeOpen)}>Theme</ThemeButton>
            {
                isThemeOpen ? 
                <PopoverMenu id='theme-popover' bgColour={fore} textColour={text}>
                    <p>Primary Theme:</p>
                    <ThemeColourGrid>
                        {
                            Object.keys(themesPrimary).map(tp => 
                                <ThemeSquare 
                                    onClick={() => setSelectedPrimary(tp)}
                                    title={themesPrimary[tp].label}
                                    style={{ background: themesPrimary[tp].fore }}
                                />)
                        }
                    </ThemeColourGrid>
                    <p>Background Colour:</p>
                    <ThemeColourGrid>
                        {
                            Object.keys(themesBackground).map(tb =>
                                <ThemeSquare
                                    onClick={() => setSelectedBackground(tb)}
                                    title={themesBackground[tb].label}
                                    style={{ background: themesBackground[tb].code }}
                                />)
                        }
                    </ThemeColourGrid>
                </PopoverMenu> : null
            }
        </ThemeContainer>

    );
}

export default ThemeSelector;