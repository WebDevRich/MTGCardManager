import {
	AppBar,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
	Typography } from '@material-ui/core';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import * as React from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import CardGrid from '../CardGrid/CardGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SingleCard from '../SingleCard/SingleCard';
import TextInput from '../TextInput/TextInput';
import TransformCard from '../TransformCard/TransformCard';

const drawerWidth = 240;

const useStyles = makeStyles((theme:Theme) =>
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
			...theme.mixins.toolbar,
			justifyContent: 'flex-end',
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
			},
				marginLeft: 0,
				marginRight: theme.spacing(1),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
			},
		},
		searchForm: {
			display: 'flex;',
			justifyContent: 'center',
		},
		title: {
			flexGrow: 1,
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
			marginRight: theme.spacing(2),
		},
		hide: {
			display: 'none',
		},
		content: {
			flexGrow: 1,
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: 0,
		},
		contentShift: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: drawerWidth,
		},
}));

export default function MainPage() {
	const classes = useStyles();
	const myTheme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [hasError, setHasError] = React.useState(false);
	const [cards, setCards] = React.useState([]);
	const [searchTerm, setSearchTerm] = React.useState('');

	function handleDrawerOpen() {
		setOpen(true);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	function submitSearch(e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		fetch(`https://api.scryfall.com/cards/search?order=released&q=${searchTerm}`)
			.then(response => response.json())
			.then(response => {
				const newCards = response.data.map((cardItem:any, index:number) => {
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
				setCards(newCards);
				setHasError(false);
			})
			.catch(error => {
				setCards(cards);
				setHasError(true);
				console.log(error);
			});
	}

	function updateSearchTerm(value:any) {
		setSearchTerm(value);
	}

	return (
		<>
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
				color='secondary'
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='Open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap={true} className={classes.title}>
						MTG Card Manager
					</Typography>
					<form noValidate={true} className={classes.searchForm} onSubmit={submitSearch}>
						<div className={classes.search}>
							<TextInput
								inputValue={updateSearchTerm}
								placeholder='Search...'
								// searchSuggestions={this.props.searchSuggestions}
							/>
						</div>
						<ButtonComponent onClick={submitSearch} color='primary' type='submit' variant='contained'>
							<SearchIcon />
						</ButtonComponent>
					</form>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{myTheme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button={true}>
						<ListItemText primary='Library' />
					</ListItem>
				</List>
			</Drawer>
			<div
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<CardGrid>
					{cards}
					{hasError &&
						<ErrorMessage />
					}
				</CardGrid>
			</div>
		</>
	);
}
