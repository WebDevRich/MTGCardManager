import * as React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import TextInput from '../TextInput/TextInput';

export interface SearchBarProps {
	// searchSuggestions: string[];
	submitSearch(value:string):void;
	hasErrored(hasErrored:boolean):void;
}

export interface SearchBarState {
	searchTerm: string;
	cards: [];
	error: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
		searchBar: {
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

		this.searchTerm = this.searchTerm.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
	}

	private searchTerm(value:any) {
		this.setState({
			searchTerm: value
		});
	};

	private submitSearch(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		this.props.submitSearch(this.state.searchTerm);
	}

	public render() {

		const { classes } = this.props;

		return (
			<div className={classes.searchBar}>
				<form noValidate className={classes.searchForm} onSubmit={this.submitSearch}>
					<div className={classes.search}>
						<TextInput
							inputValue={this.searchTerm}
							placeholder='Search...'
							// searchSuggestions={this.props.searchSuggestions}
						/>
					</div>
					<PrimaryButton>
						<SearchIcon />
					</PrimaryButton>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(SearchBar);
