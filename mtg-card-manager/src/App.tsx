import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainPage from './MainPage/MainPage';
import SignInForm from './SignInForm/SignInForm';

const styles = (theme: Theme) =>
  createStyles({
		cardManager: {
			textAlign: 'center',
			fontFamily: 'Roboto, sans-serif',
			display: 'grid',
			gridTemplate: 'auto 1fr / 1fr',
			gridGap: '20px',
		}
	});

export interface AppProps extends WithStyles<typeof styles> {}

export class App extends React.PureComponent<AppProps> {


	public render() {

		const { classes } = this.props;

		return (
			<>
				{/* Material-UI CSS resets */}
				<CssBaseline />

				{/* App */}
				<Router>
					<div className={classes.cardManager}>
						<Route exact path="/" component={MainPage} />
						<Route exact path="/signin" component={SignInForm} />
					</div>
				</Router>
			</>
		);
	}
}

export default withStyles(styles)(App);
