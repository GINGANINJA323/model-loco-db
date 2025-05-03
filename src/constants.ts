export const devices = {
    mobile: '(max-width: 800px)',
    desktop: '(min-width: 801px)'
};

export const themesPrimary: { [key: string]: { fore: string, text: string, label: string, hover: string } } = {
    light: {
        fore: '#FFFFFF',
        text: '#000000',
        label: 'Light',
        hover: '#dbdbdb'
    },
    dark: {
        fore: '#3b3a3a',
        text: '#FFFFFF',
        label: 'Dark',
        hover: '#000000'
    }
};

export const themesBackground: { [key: string]: { label: string, code: string } } = {
    lnerAppleGreen: {
        label: 'LNER Apple Green',
        code: '#99cc67'
    },
    brDarkGreen: {
        label: 'BR Dark Locomotive Green',
        code: '#1C623F'
    },
    brDarkBlue: {
        label: 'BR Dark Locomotive Blue',
        code: '#25555C'
    },
    brIntercityBlue: {
        label: 'BR Intercity Blue',
        code: '#3C4876'
    }
};