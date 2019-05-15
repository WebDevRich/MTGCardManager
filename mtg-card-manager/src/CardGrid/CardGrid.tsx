import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
		cardGrid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			gridGap: '20px',
			padding: '0 20px 20px',
		}
	});

export interface CardGridProps extends WithStyles<typeof styles> {}

export class cardGrid extends React.PureComponent<CardGridProps> {

	public render() {

		const { classes } = this.props;

		return(
			<div className={classes.cardGrid}>
				{this.props.children}
			</div>
		);
	}
}

export default withStyles(styles)(cardGrid);
