import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';

const useStyles = makeStyles((theme:Theme) =>
	createStyles({
		cardContainer: {
			gridColumn: 'span 1',
			display: 'grid',
			borderRadius: 4,
			overflow: 'hidden',
			'& img': {
				width: '100%',
				height: 'auto',
			},
		},
		singleCard: {
			gridColumn: '1 / -1',
			gridRow: '1 / -1',
		},
	}));

interface SingleCardProps {
	src: string;
	alt: string;
}

export default function SingleCard(props:SingleCardProps) {

	const classes = useStyles(props);

	return(
		<div className={classes.cardContainer}>
			<div className={classes.singleCard}>
				<img src={props.src} alt={props.alt} />
			</div>
		</div>
	);
}
