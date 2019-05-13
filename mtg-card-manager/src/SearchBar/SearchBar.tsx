import * as React from 'react';
import { InputBase, Button } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

export interface SearchBarProps {
	newCards(cards:[]):void;
	displayError(hasError:boolean):void;
}

export interface SearchBarState {
	searchTerm: string;
	cards: [];
	error: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
		searchBox: {
			gridColumn: '1 / -1',
			padding: 20,
			display: 'flex',
			justifyContent: 'center',
			backgroundColor: theme.palette.secondary.dark,
			color: theme.palette.secondary.contrastText
		},
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
			marginLeft: 0,
			marginRight: theme.spacing.unit,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
		},
		searchForm: {
			display: 'flex;'
		},
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
			width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 200,
      },
		}
	});

export interface SearchBarProps extends WithStyles<typeof styles> {}

export class SearchBar extends React.PureComponent<SearchBarProps, SearchBarState> {

	constructor(props: SearchBarProps) {
		super(props)

		this.state = {
			searchTerm: '',
			cards: [],
			error: false,
		}

		this.submitSearch = this.submitSearch.bind(this);
	}

	private searchTermValueChange(value:any) {
		this.setState({
			searchTerm: value
		});
	};

	private submitSearch(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const query = this.state.searchTerm;
		fetch(`https://api.scryfall.com/cards/search?order=released&q=${query}`)
			.then(response => response.json())
			.then(response => {
				console.log(response.data[0].image_uris.border_crop);
				let cards = response.data.map((cardPic:any, index:number) => {
					return(
						<div className='search-item' key={index}>
							<img src={cardPic.image_uris.border_crop} alt='' key={index} />
						</div>
					)
				})
				this.setState({
					cards: cards,
				}, () => {
					this.props.newCards(this.state.cards);
				});
			})
			.catch(error => {
				this.setState({
					error: true,
				}, () => {
					this.props.displayError(this.state.error);
				});
				console.log(error)
			})
	}

	public render() {

		const { classes } = this.props;

		return (
			<div className={classes.searchBox}>
				<form noValidate className={classes.searchForm} onSubmit={this.submitSearch}>
					<div className={classes.search}>
						<InputBase
							autoComplete='true'
							placeholder="Search…"
							classes={{
								input: classes.inputInput,
							}}
							onChange={event => this.searchTermValueChange(event.target.value)}
						/>
					</div>
					<Button variant='contained' type='submit' color='primary'>
						<SearchIcon />
					</Button>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(SearchBar);
