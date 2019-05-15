import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
		errorMessage: {
			gridColumn: '1 / -1',
		}
	});

export interface ErrorMessage extends WithStyles<typeof styles> {}

export class errorMessage extends React.PureComponent<ErrorMessage> {

	public render() {

		const { classes } = this.props;

		return(
			<div className={classes.errorMessage}>
				Something went wrong
			</div>
		);
	}
}

export default withStyles(styles)(errorMessage);
