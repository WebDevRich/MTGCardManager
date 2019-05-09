import * as React from 'react';
import './App.scss';
import SearchBar from './SearchBar/SearchBar';
import CssBaseline from '@material-ui/core/CssBaseline';

interface AppState {
	cards: [];
	searchTerm: string;
}

export class App extends React.PureComponent<{}, AppState> {

	constructor(props:any) {
		super(props);

		this.state = {
			cards: [],
			searchTerm: '',
		}

		this.loadNewCards = this.loadNewCards.bind(this);
	}

	private loadNewCards(newCards:[]) {
		this.setState({
			cards: newCards,
		});
	}

	public render() {

		return (
			<>
				{/* Material-UI CSS resets */}
				<CssBaseline />

				{/* App */}
				<div className='App'>
					<SearchBar
						newCards={this.loadNewCards}
					/>
					{this.state.cards}
				</div>
			</>
		);
	}
}

export default App;
