import * as React from 'react';
import { InputBase } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
			width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 200,
      },
		}
	});

export interface TextInputProps extends WithStyles<typeof styles> {
	inputValue(value:string):void;
	placeholder: string;
}

export interface TextInputState {
	inputValue: string;
}

export class TextInput extends React.PureComponent<TextInputProps, TextInputState> {

	constructor(props: TextInputProps) {
		super(props)

		this.state = {
			inputValue: '',
		}
	}

	private inputValueChange(value:any) {
		this.setState({
			inputValue: value
		}, () => {
			this.props.inputValue(this.state.inputValue);
		});
	};

	public render() {

		const { classes } = this.props;

		return(
			<InputBase
				placeholder={this.props.placeholder}
				className={classes.inputInput}
				onChange={event => this.inputValueChange(event.target.value)}
			/>
		)
	}

}

export default withStyles(styles)(TextInput);
