import * as React from 'react';
import { InputBase, ButtonBase } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

export interface SearchBarProps {
	newCards(cards:[]):void;
}

export interface SearchBarState {
	searchTerm: string;
	cards: [];
}

const styles = (theme: Theme) =>
  createStyles({
		searchBox: {
			gridColumnStart: 1,
			gridColumnEnd: -1,
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
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
	});

export interface SearchBarProps extends WithStyles<typeof styles> {}

export class SearchBar extends React.PureComponent<SearchBarProps, SearchBarState> {

	constructor(props: SearchBarProps) {
		super(props)

		this.state = {
			searchTerm: '',
			cards: [],
		}

		this.submitSearch = this.submitSearch.bind(this);
	}

	private searchTermValueChange(value:any) {
		this.setState({
			searchTerm: value
		});
	};

	private submitSearch() {
		const query = this.state.searchTerm;
		fetch(`https://api.scryfall.com/cards/search?order=released&q=${query}`)
			.then(response => response.json())
			.then(response => {
				let cards = response.data.map((cardPic:any, index:number) => {
					return(
						<div className='search-result' key={index}>
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
			.catch(error =>
				console.log(error)
			)
	}

	public render() {

		const { classes } = this.props;

		return (
			<div className={classes.searchBox}>
				<div className={classes.search}>
					<InputBase
						placeholder="Search…"
						classes={{
							input: classes.inputInput,
						}}
						onChange={event => this.searchTermValueChange(event.target.value)}
					/>
				</div>
				<ButtonBase onClick={this.submitSearch} type='submit' color='primary'>
					<SearchIcon />
				</ButtonBase>
			</div>
		);
	}
}

export default withStyles(styles)(SearchBar);
