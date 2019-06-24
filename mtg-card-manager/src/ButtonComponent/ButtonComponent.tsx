import { Button, PropTypes } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = (theme:Theme) =>
	createStyles({
		fullWidth: {
			marginTop: theme.spacing(3),
		},
	});

export interface ButtonComponentProps extends WithStyles<typeof styles> {
	color?: PropTypes.Color;
	fullWidth?: boolean;
	onClick(e:React.MouseEvent<HTMLButtonElement>):void;
	type?: ButtonProps['type'];
	variant?: ButtonProps['variant'];
}

export interface ButtonComponentState {
	clicked: boolean;
}

export class ButtonComponent extends React.PureComponent<ButtonComponentProps, ButtonComponentState> {

	constructor(props:ButtonComponentProps) {
		super(props);

		this.state = {
			clicked: false,
		};

		this.buttonClicked = this.buttonClicked.bind(this);
	}

	private buttonClicked(e:React.MouseEvent<HTMLButtonElement>) {
		this.props.onClick(e);
	}

	public render() {

		const {
			classes,
			color,
			fullWidth,
			type,
			variant,
		} = this.props;

		return(
			<Button
				color={color}
				className={fullWidth ? classes.fullWidth : ''}
				fullWidth={fullWidth}
				type={type}
				onClick={this.buttonClicked}
				variant={variant}
			>
				{this.props.children}
			</Button>
		);
	}
}

export default withStyles(styles)(ButtonComponent);
