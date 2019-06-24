import { IconButton, InputAdornment } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as React from 'react';

export interface PasswordFieldProps {
	onChange(value:string):void;
	passwordError: boolean;
}

export interface PasswordFieldState {
	password: string;
	showPassword: boolean;
	passwordValue: string;
}

export class PasswordField extends React.PureComponent<PasswordFieldProps, PasswordFieldState> {
	constructor(props:PasswordFieldProps) {
		super(props);

		this.state = {
			password: '',
			showPassword: false,
			passwordValue: '',
		};

		this.updatePasswordValue = this.updatePasswordValue.bind(this);
	}

	private updatePasswordValue(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const newPasswordValue = e.currentTarget.value;

		this.setState({
			passwordValue: newPasswordValue,
		}, () => {
			this.props.onChange(this.state.passwordValue);
		});
	}

	private handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	}

	public render() {

		return(
			<>
				<Input
					name='password'
					type={this.state.showPassword ? 'text' : 'password'}
					id='password'
					autoComplete='current-password'
					onChange={this.updatePasswordValue}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='Toggle password visibility'
								onClick={this.handleClickShowPassword}
							>
								{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>

				{this.props.passwordError &&
					<FormHelperText>Please enter a password longer than 6 characters</FormHelperText>
				}
			</>
		);
	}
}

export default PasswordField;
