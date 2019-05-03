import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#5eb8ff',
			main: '#0288d1',
			dark: '#005b9f',
			contrastText: '#e1f5fe',
		},
		secondary: {
			light: '#718792',
			main: '#455a64',
			dark: '#1c313a',
			contrastText: '#e1f5fe',
		},
	}
})

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<App />
	</MuiThemeProvider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
