import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = () =>
	createStyles({
		cardGrid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			gridGap: '20px',
			padding: '0 20px 20px',
		},
	});

export interface CardGridProps extends WithStyles<typeof styles> {}

export class CardGrid extends React.PureComponent<CardGridProps> {

	public render() {

		const { classes } = this.props;

		return(
			<div className={classes.cardGrid}>
				{this.props.children}
			</div>
		);
	}
}

export default withStyles(styles)(CardGrid);
