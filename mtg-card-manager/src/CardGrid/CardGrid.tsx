// import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import {
	createStyles,
	makeStyles,
	Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as React from 'react';

const useStyles = makeStyles((theme:Theme) =>
	createStyles({
		cardGrid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			gridGap: '20px',
			padding: '85px 20px 20px',
		},
}));

export default function CardGrid(props:any) {

	const classes = useStyles();

	return(
		<div className={clsx(classes.cardGrid)}>
			{props.children}
		</div>
	);
}
