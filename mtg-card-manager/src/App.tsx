import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardGrid from './CardGrid/CardGrid';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import SearchBar from './SearchBar/SearchBar';
import SingleCard from './SingleCard/SingleCard';
import TransformCard from './TransformCard/TransformCard';

interface AppState {
	cards: string[];
	// cardNames: string[];
	hasError: boolean;
	searchTerm: string;
}

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

export class App extends React.PureComponent<AppProps, AppState> {

	constructor(props:any) {
		super(props);

		this.state = {
			cards: [],
			// cardNames: [],
			hasError: false,
			searchTerm: '',
		}

		this.loadNewCards = this.loadNewCards.bind(this);
		this.hasErrored = this.hasErrored.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
	}

	// componentWillMount() {
	// 	fetch('https://api.scryfall.com/catalog/card-names')
	// 	.then(response => response.json())
	// 	.then(response => {
	// 		this.setState({
	// 			cardNames: response.data,
	// 		}, () => {
	// 			console.log(this.state.cardNames);
	// 		});
	// 	})
	// }

	private loadNewCards(newCards:[]) {
		this.setState({
			cards: newCards,
		});
	}

	private hasErrored(hasError:boolean) {
		this.setState({
			hasError,
		});
	}

	private submitSearch(searchTerm:string) {
		fetch(`https://api.scryfall.com/cards/search?order=released&q=${searchTerm}`)
			.then(response => response.json())
			.then(response => {
				let cards = response.data.map((cardItem:any, index:number) => {
					return cardItem.image_uris ? (
						<SingleCard key={index} alt={cardItem.name} src={cardItem.image_uris.border_crop} />
					) : (
						<TransformCard
							faceOneImage={cardItem.card_faces[0].image_uris.border_crop}
							faceOneName={cardItem.card_faces[0].name}
							faceTwoImage={cardItem.card_faces[1].image_uris.border_crop}
							faceTwoName={cardItem.card_faces[1].name}
							key={index}
						/>
					);
				})
				this.setState({
					cards: cards,
					hasError: false,
				});
			})
			.catch(error => {
				this.setState({
					cards: [],
					hasError: true,
				});
				console.log(error)
			})
	}

	public render() {

		const { classes } = this.props;

		return (
			<>
				{/* Material-UI CSS resets */}
				<CssBaseline />

				{/* App */}
				<div className={classes.cardManager}>
					<SearchBar
						// searchSuggestions={this.state.cardNames}
						submitSearch={this.submitSearch}
						hasErrored={this.hasErrored}
					/>
					<CardGrid>

						{this.state.cards}

						{this.state.hasError &&
							<ErrorMessage />
						}

					</CardGrid>
				</div>
			</>
		);
	}
}

export default withStyles(styles)(App);
