import { createTheme } from '@mui/material/styles';

const themeObj = {
    light: {
        text: {
            primary: '#000',
        },
        background: {
            hard: '#fff',
            medium: '#fdfdfd',
            light: '#efefef',
            borderLight: '#bdbdbd',
            shadow: '#000',
            greenColor: 'rgba(27,200,112,1)',
            lightGreen: 'rgba(27,200,112,0.2)',
            redColor: 'rgba(255,0,51,1)',
            lightRed: 'rgba(255,0,51,0.2)',
        },
    },

    dark: {
        text: {
            primary: '#fff',
        },
        background: {
            hard: '#000',
            medium: '#151515',
            light: '#212121',
            borderLight: '#424242',
            shadow: '#000',
            greenColor: 'rgba(27,200,112,1)',
            lightGreen: 'rgba(27,200,112,0.2)',
            redColor: 'rgba(255,0,51,1)',
            lightRed: 'rgba(255,0,51,0.2)',
        },
    },
};

export const createCustomTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...themeObj[mode],
        },
        typography: {
            fontFamily: ['Poppins', 'Audiowide', 'sans-serif'].join(','),
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => `
		    body {
		      background-color: ${theme.palette.mode === 'dark' ? '#080C48' : '#fdfdfd'}
		    }
		  `,
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'chipactive' },
                        style: {
                            background: 'linear-gradient(97.01deg, #6C7DEB 8.16%, #50A6ED 103.71%)',
                            webkitBackgroundClip: 'text',
                            webkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            border: '1px solid #6C7DEB',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '24px',
                            letterSpacing: '0.045em',
                        },
                    },
                    {
                        props: { variant: 'chip' },
                        style: {
                            background: 'linear-gradient(97.01deg, #6C7DEB 8.16%, #50A6ED 103.71%)',
                            webkitBackgroundClip: 'text',
                            webkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textFillColor: 'transparent',
                            fontFamily: 'Poppins',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '24px',
                            letterSpacing: '0.045em',
                        },
                    },
                    {
                        props: { variant: 'gradient' },
                        style: {
                            background: 'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.3)',
                            color: '#fff',
                            fontFamily: '"Poppins", sans-serif',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '24px',
                            letterSpacing: '0.045em',
                            '&:hover': {
                                background:
                                    'linear-gradient(90.24deg, #00BFF5 6.69%, #0055C2 67.89%)',
                            },
                        },
                    },
                ],
            },
        },
    });
