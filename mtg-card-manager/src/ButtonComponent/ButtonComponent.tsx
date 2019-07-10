import { Button, PropTypes } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme:Theme) =>
	createStyles({
		fullWidth: {
			marginTop: theme.spacing(3),
		},
		attachedButton: {
			boxShadow: 'none',
			borderRadius: '0 0 4px 4px',
		},
	}));

export interface ButtonComponentProps {
	attached?: boolean;
	children: any;
	classNames?: string;
	color?: PropTypes.Color;
	fullWidth?: boolean;
	onClick(e:React.MouseEvent<HTMLButtonElement>):void;
	type?: ButtonProps['type'];
	variant?: ButtonProps['variant'];
}

export default function ButtonComponent(props:ButtonComponentProps) {

	const classes = useStyles(props);

	function buttonClicked(e:React.MouseEvent<HTMLButtonElement>) {
		props.onClick(e);
	}

	return (
		<Button
			color={props.color}
			className={`
				${props.fullWidth ? classes.fullWidth : ''}
				${props.classNames}
				${props.attached ? classes.attachedButton : '' }
			`}
			fullWidth={props.fullWidth}
			type={props.type}
			onClick={buttonClicked}
			variant={props.variant}
		>
			{props.children}
		</Button>
	);
}
