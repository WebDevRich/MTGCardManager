import * as React from 'react';
import { Button } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
		fullWidth: {
			marginTop: theme.spacing.unit * 3,
		}
	})

export interface PrimaryButtonProps extends WithStyles<typeof styles> {
	fullWidth?: boolean;
}

export class PrimaryButton extends React.PureComponent<PrimaryButtonProps> {

	public render() {

		const { classes } = this.props;

		return(
			<Button
				fullWidth={this.props.fullWidth}
				variant='contained'
				type='submit'
				color='primary'
				className={this.props.fullWidth ? classes.fullWidth : ''}
			>
				{this.props.children}
			</Button>
		)
	}
}

export default withStyles(styles)(PrimaryButton);
