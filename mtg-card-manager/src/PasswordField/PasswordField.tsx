import * as React from 'react';
import Input from '@material-ui/core/Input';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export interface PasswordFieldState {
	password: string;
  showPassword: boolean;
}

export class PasswordField extends React.PureComponent<{}, PasswordFieldState> {
	constructor(props:any) {
		super(props)

		this.state = {
			password: '',
			showPassword: false,
		}
	}

	handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

	public render() {

		return(
			<Input
				name="password"
				type={this.state.showPassword ? 'text' : 'password'}
				id="password"
				autoComplete="current-password"
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="Toggle password visibility"
							onClick={this.handleClickShowPassword}
						>
							{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
			/>
		)
	}
}

export default PasswordField;
