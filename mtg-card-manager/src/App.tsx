import CssBaseline from '@material-ui/core/CssBaseline';
import {
	createStyles,
	makeStyles } from '@material-ui/core/styles';
import React, { createContext, Dispatch, useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { initialState, IState } from './initialStates';
import MainPage from './MainPage/MainPage';
import drawerReducer, { Actions } from './reducers/drawerReducer';
import SignInForm from './SignInForm/SignInForm';

const useStyles = makeStyles(() =>
	createStyles({
		cardManager: {
			textAlign: 'center',
			fontFamily: 'Roboto, sans-serif',
		},
	}),
);

interface IContextProps {
	state: IState;
	dispatch: Dispatch<Actions>;
}

export const Store = createContext({} as IContextProps);

export default function MTGAppBar(props:any) {

	const [ state, dispatch ] = useReducer(drawerReducer, initialState);

	const classes = useStyles(props);

	const value = { state, dispatch };

	return (
		<Store.Provider value={value}>
			{/* Material-UI CSS resets */}
			<CssBaseline />

			{/* App */}
			<Router>
				<div className={classes.cardManager}>
					<Route exact={true} path='/' component={MainPage} />
					<Route exact={true} path='/signin' component={SignInForm} />
				</div>
			</Router>
		</Store.Provider>
	);
}
