import {
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText } from '@material-ui/core';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import * as React from 'react';
import CardGrid from '../CardGrid/CardGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MTGAppBar from '../MTGAppBar/MTGAppBar';

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

	function handleDrawerClose() {
		setOpen(false);
	}

	function handleNewCards(newCards:any) {
		setCards(newCards);
	}

	return (
		<>
			<MTGAppBar cards={handleNewCards} />

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
				<CardGrid hasError={hasError}>
					{cards}
					{hasError &&
						<ErrorMessage />
					}
				</CardGrid>
			</div>
		</>
	);
}
