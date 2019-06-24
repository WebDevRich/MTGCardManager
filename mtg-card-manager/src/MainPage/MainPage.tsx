import { Divider, Drawer, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';
import CardGrid from '../CardGrid/CardGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBar from '../SearchBar/SearchBar';
import SingleCard from '../SingleCard/SingleCard';
import { theme } from '../theme';
import TransformCard from '../TransformCard/TransformCard';

const drawerWidth = 240;

const styles = (uiTheme:Theme) =>
	createStyles({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...uiTheme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
});

interface MainPageState {
	cards: string[];
	// cardNames: string[];
	hasError: boolean;
	searchTerm: string;
	open: boolean;
	setOpen: boolean;
}

export interface MainPageProps extends WithStyles<typeof styles> {}

export class MainPage extends React.PureComponent<MainPageProps, MainPageState> {

	constructor(props:MainPageProps) {
		super(props);

		this.state = {
			cards: [],
			// cardNames: [],
			hasError: false,
			searchTerm: '',
			open: false,
			setOpen: false,
		};

		this.loadNewCards = this.loadNewCards.bind(this);
		this.hasErrored = this.hasErrored.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
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
				const cards = response.data.map((cardItem:any, index:number) => {
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
				});
				this.setState({
					cards,
					hasError: false,
				});
			})
			.catch(error => {
				this.setState({
					cards: [],
					hasError: true,
				});
				console.log(error);
			});
	}

	private handleDrawerClose() {
		this.setState({
			setOpen: false,
		});
	}

	public render() {

		const { classes } = this.props;

		return (
			<>
				<SearchBar
					// searchSuggestions={this.state.cardNames}
					submitSearch={this.submitSearch}
					hasErrored={this.hasErrored}
				/>
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={this.state.open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>
						<ListItem button={true}>
							<ListItemText primary='Library' />
						</ListItem>
					</List>
				</Drawer>

				<CardGrid>

					{this.state.cards}

					{this.state.hasError &&
						<ErrorMessage />
					}

				</CardGrid>
			</>
		);
	}
}

export default withStyles(styles)(MainPage);
