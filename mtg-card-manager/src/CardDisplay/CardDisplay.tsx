import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
		cardDisplay: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			gridGap: '20px',
			padding: '0 20px 20px',
		}
	});

export interface CardDisplayProps extends WithStyles<typeof styles> {}

export class cardDisplay extends React.PureComponent<CardDisplayProps> {

	public render() {

		const { classes } = this.props;

		return(
			<div className={classes.cardDisplay}>
				{this.props.children}
			</div>
		);
	}
}

export default withStyles(styles)(cardDisplay);
