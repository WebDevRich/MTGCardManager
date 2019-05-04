import * as React from 'react';
import './App.scss';
import SearchBar from './SearchBar/SearchBar';
import CssBaseline from '@material-ui/core/CssBaseline';

interface AppState {
	cards: [];
}

export class App extends React.PureComponent<{}, AppState> {

	constructor(props:any) {
		super(props);

		this.state = {
			cards: [],
		}
	}

	componentDidMount() {
		fetch('https://api.scryfall.com/cards/search?order=released&q=riot')
			.then(response => response.json())
			.then(response => {
				let cards = response.data.map((cardPic:any) => {
					return(
						<div className='search-result' key={cardPic.results}>
							<img src={cardPic.image_uris.normal} alt='' />
						</div>
					)
				})
				this.setState({
					cards: cards,
				});
			})
			.catch(error =>
				console.log(error)
			)
	}

	public render() {

		return (
			<>
				{/* Material-UI CSS resets */}
				<CssBaseline />

				{/* App */}
				<div className='App'>
					<SearchBar />
					{this.state.cards}
				</div>
			</>
		);
	}
}

export default App;
