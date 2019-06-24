import { createMuiTheme } from '@material-ui/core';
import { blueGrey, cyan } from '@material-ui/core/colors';

export const theme = createMuiTheme({
	overrides: {
		MuiCssBaseline: {
			'@global': {
				body: {
					backgroundColor: blueGrey[800],
				},
				img: {
					display: 'inherit',
				},
			},
		},
	},
	palette: {
		primary: {
			light: cyan[500],
			main: cyan[800],
			dark: cyan[900],
			contrastText: '#e1f5fe',
		},
		secondary: {
			light: blueGrey[500],
			main: blueGrey[800],
			dark: blueGrey[900],
			contrastText: blueGrey[50],
		},
	},
});
