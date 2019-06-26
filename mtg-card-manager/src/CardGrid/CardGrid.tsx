// import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import {
	createStyles,
	makeStyles,
	Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as React from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme:Theme) =>
	createStyles({
		cardGrid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			gridGap: '20px',
			padding: '85px 20px 20px',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
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

export default function CardGrid(props:any) {

	const classes = useStyles();

	return(
		<div
			className={clsx(classes.cardGrid, classes.content, {
				[classes.contentShift]: props.open,
			})}
		>
			{props.children}
		</div>
	);
}
