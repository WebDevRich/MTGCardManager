import * as React from 'react';
import './App.scss';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from './SearchBar/SearchBar';

interface AppState {
	cards: [];
	hasError: boolean;
	searchTerm: string;
}

const styles = (theme: Theme) =>
  createStyles({
		errorMessage: {
			display: 'none',
			gridColumn: '1 / -1',
		},
		errorMessageActive: {
			display: 'block',
		}
	});

export interface AppProps extends WithStyles<typeof styles> {}

export class App extends React.PureComponent<AppProps, AppState> {

	constructor(props:any) {
		super(props);

		this.state = {
			cards: [],
			hasError: false,
			searchTerm: '',
		}

		this.loadNewCards = this.loadNewCards.bind(this);
		this.displayError = this.displayError.bind(this);
	}

	private loadNewCards(newCards:[]) {
		this.setState({
			cards: newCards,
		});
	}

	private displayError(hasError:boolean) {
		this.setState({
			hasError,
		});
	}

	public render() {

		const { classes } = this.props;

		return (
			<>
				{/* Material-UI CSS resets */}
				<CssBaseline />

				{/* App */}
				<div className='App'>
					<SearchBar
						newCards={this.loadNewCards}
						displayError={this.displayError}
					/>
					<div className='search-results'>

						{this.state.cards}

						<div className={`
							${classes.errorMessage}
							${this.state.hasError ? classes.errorMessageActive : ''}
						`}>
							Something went wrong
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default withStyles(styles)(App);
