import { FormControl } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as EmailValidator from 'email-validator';
import jwt_decode from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { loginUser, registerUser } from '../actions/authActions';
import { Store } from '../App';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { TokenTypes } from '../model/types';
import PasswordField from '../PasswordField/PasswordField';

const useStyles = makeStyles((theme:Theme) =>
	createStyles({
		main: {
			width: 'auto',
			display: 'block', // Fix IE 11 issue.
			marginLeft: theme.spacing(3),
			marginRight: theme.spacing(3),
			[theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
				width: 400,
				marginLeft: 'auto',
				marginRight: 'auto',
			},
		},
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing(1),
		},
	}));

export interface SignInFormProps {
	signedIn(success:boolean):void;
}

export default function SignInForm(props:SignInFormProps) {

	const classes = useStyles(props);
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [submitError, setSubmitError] = useState(false);
	const [existingUser, setExistingUser] = useState(false);
	const { state, dispatch } = useContext(Store);

	const setCurrentUser = (decoded:any) => {

		return dispatch({
			type: 'SET_CURRENT_USER',
			payload: decoded,
		});
	};

	function updateEmailValue(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setEmailValue(e.currentTarget.value);
	}

	function passwordValueUpdate(newPasswordValue:string) {
		setPasswordValue(newPasswordValue);
	}

	// Validate email
	function validateEmail() {
		let isValid = false;
		if (!EmailValidator.validate(emailValue)) {
			isValid = false;
			setEmailError(true);
		} else {
			isValid = true;
			setEmailError(false);
		}

		return isValid;
	}

	// Validate password
	function validatePassword() {
		let isValid = false;
		if (passwordValue.length < 6) {
			isValid = false;
			setPasswordError(true);
		} else {
			isValid = true;
			setPasswordError(false);
		}

		return isValid;
	}

	function handleErrorResponse(response:any) {
		console.log(response);
		if (response.data.email === 'Email already exists') {
			console.log(response.data.email);
			setSubmitError(true);
			setExistingUser(true);
		} else if (response.data.emailnotfound || response.data.passwordincorrect) {
			setSubmitError(true);
		} else {
			setSubmitError(true);
		}
	}

	function formSubmit() {
		if (validateEmail() && validatePassword()) {
			const userData = {
				email: emailValue,
				password: passwordValue,
			};
			if (!existingUser) {
				registerUser(userData,
					(response:any) => {
						if (response.status !== 200) {
							handleErrorResponse(response);
						}
					},
				);
			} else {
				loginUser(userData,
					(response:any) => {
						if (response.status !== 200) {
							handleErrorResponse(response);
						} else {
							const { token } = response.data;
							localStorage.setItem('jwtToken', token);
							const decoded:TokenTypes = jwt_decode(token);
							setCurrentUser(decoded.id);
						}
					},
				);
			}
		}
	}

	function formSubmitButton(e:React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		formSubmit();
	}

	function toggleExistingUser() {
		setExistingUser(!existingUser);
	}

	return(
		<>
			{ state.userEmail &&
				<Redirect to='/' />
			}

			<main className={classes.main}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in / Register
					</Typography>
					<form className={classes.form} onSubmit={formSubmit}>
						<FormControl margin='normal' error={emailError} required={true} fullWidth={true}>
							<InputLabel	htmlFor='email'>Email Address {state.userEmail}</InputLabel>
							<Input
								id='email'
								name='email'
								autoComplete='email'
								autoFocus={true}
								onChange={updateEmailValue}
							/>
							{emailError &&
								<FormHelperText>Please enter a valid email</FormHelperText>
							}
						</FormControl>
						<FormControl margin='normal' error={passwordError} required={true} fullWidth={true}>
							<InputLabel htmlFor='password'>Password</InputLabel>
							<PasswordField passwordError={passwordError} onChange={passwordValueUpdate} />
						</FormControl>
						<ButtonComponent
							onClick={formSubmitButton}
							fullWidth={true}
							color='primary'
							type='submit'
							variant='contained'
						>
							{existingUser ? 'Sign In' : 'Register'}
						</ButtonComponent>
						{submitError &&
							<FormHelperText error={true}>An account already exists with this email, please sign in.</FormHelperText>
						}
					</form>
					<ButtonComponent
						onClick={toggleExistingUser}
						fullWidth={true}
						color='default'
						variant='text'
						type='submit'
					>
						{!existingUser ? 'Already have an account? Sign In...' : 'New here? Register...'}
					</ButtonComponent>
				</Paper>
			</main>
		</>
	);
}
