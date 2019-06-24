import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = () =>
	createStyles({
		errorMessage: {
			gridColumn: '1 / -1',
		},
	});

export interface ErrorMessageProps extends WithStyles<typeof styles> {}

export class ErrorMessage extends React.PureComponent<ErrorMessageProps> {

	public render() {

		const { classes } = this.props;

		return(
			<div className={classes.errorMessage}>
				Something went wrong
			</div>
		);
	}
}

export default withStyles(styles)(ErrorMessage);
