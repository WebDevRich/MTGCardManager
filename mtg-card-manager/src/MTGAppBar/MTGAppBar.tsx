import {
	AppBar,
	IconButton,
	Toolbar,
	Typography } from '@material-ui/core';
import {
	createStyles,
	makeStyles,
	Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import SingleCard from '../SingleCard/SingleCard';
import TextInput from '../TextInput/TextInput';
import TransformCard from '../TransformCard/TransformCard';

const drawerWidth = 240;

const useStyles = makeStyles((theme:Theme) =>
	createStyles({
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
}));

export default function MTGAppBar(props:any) {

	const classes = useStyles(props);
	const [open, setOpen] = React.useState(false);
	const [hasError, setHasError] = React.useState(false);
	const [cards, setCards] = React.useState([]);
	const [searchTerm, setSearchTerm] = React.useState('');

	function handleDrawerOpen() {
		setOpen(true);
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

	useEffect(() => {
		console.log(hasError);
	}, [hasError]);

	useEffect(() => {
		props.cards(cards);
		console.log(cards);
	}, [cards]);

	function updateSearchTerm(value:any) {
		setSearchTerm(value);
	}

	return (
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
						/>
					</div>
					<ButtonComponent onClick={submitSearch} color='primary' type='submit' variant='contained'>
						<SearchIcon />
					</ButtonComponent>
				</form>
			</Toolbar>
		</AppBar>
	);
}
