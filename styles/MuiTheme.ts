import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'Roboto',
            'Helvetica',
            'Lato',
            'Arial',
            'sans-serif',
        ].join(', '),
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
    },
    palette: {
        primary: {
            light: '#19A463',
            main: '#1BB16B',
            dark: '#64E8AA',
            contrastText: '#fff',
        },
    },
});

export default theme;
