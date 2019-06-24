import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import * as React from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
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
	open: boolean;
	setOpen: boolean;
}

const drawerWidth = 240;

const styles = (theme:Theme) =>
	createStyles({
		searchBar: {
			gridColumn: '1 / -1',
			padding: 20,
			display: 'flex',
			justifyContent: 'center',
			backgroundColor: theme.palette.secondary.dark,
			color: theme.palette.secondary.contrastText,
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
				display: 'flex;',
			},
			appBar: {
			transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
			transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
			}),
			},
			menuButton: {
			marginRight: theme.spacing.unit * 2,
		},
		hide: {
			display: 'none',
		},
	});

export interface SearchBarProps extends WithStyles<typeof styles> {}

export class SearchBar extends React.PureComponent<SearchBarProps, SearchBarState> {

	constructor(props:SearchBarProps) {
		super(props);

		this.state = {
			searchTerm: '',
			cards: [],
			error: false,
			open: false,
			setOpen: false,
		};

		this.searchTerm = this.searchTerm.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
	}

	private searchTerm(value:any) {
		this.setState({
			searchTerm: value,
		});
	}

	private submitSearch(e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		this.props.submitSearch(this.state.searchTerm);
	}

	private handleDrawerOpen() {
		this.setState({
			setOpen: true,
		});
	}

	public render() {

		const { classes } = this.props;

		return (
			<div className={classes.searchBar}>
				<AppBar
					position='fixed'
					className={clsx(classes.appBar, {
						[classes.appBarShift]: this.state.open,
					})}
				>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='Open drawer'
							onClick={this.handleDrawerOpen}
							// edge="start"
							className={clsx(classes.menuButton, this.state.open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
					<form noValidate={true} className={classes.searchForm} onSubmit={this.submitSearch}>
						<div className={classes.search}>
							<TextInput
								inputValue={this.searchTerm}
								placeholder='Search...'
								// searchSuggestions={this.props.searchSuggestions}
							/>
						</div>
						<ButtonComponent onClick={this.submitSearch} color='primary' type='submit' variant='contained'>
							<SearchIcon />
						</ButtonComponent>
					</form>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(SearchBar);
