import * as EmailValidator from 'email-validator';
import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import PasswordField from '../PasswordField/PasswordField';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = (theme: Theme) =>
  createStyles({
    main: {
			width: 'auto',
			display: 'block', // Fix IE 11 issue.
			marginLeft: theme.spacing.unit * 3,
			marginRight: theme.spacing.unit * 3,
			[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
				width: 400,
				marginLeft: 'auto',
				marginRight: 'auto',
			},
		},
		paper: {
			marginTop: theme.spacing.unit * 8,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
		},
		avatar: {
			margin: theme.spacing.unit,
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: '100%', // Fix IE 11 issue.
			marginTop: theme.spacing.unit,
		},
	});

export interface SignInFormProps extends WithStyles<typeof styles> {
	signedIn(success:boolean):void;
}

export interface SignInFormState {
	emailError: boolean;
	emailValue: string;
	passwordError: boolean;
	passwordValue: string;
	existingUser: boolean;
	signedIn: boolean;
}

export class SignInForm extends React.PureComponent<SignInFormProps, SignInFormState> {

	constructor(props:SignInFormProps) {
		super(props)

		this.state = {
			emailError: false,
			emailValue: '',
			passwordError: false,
			passwordValue: '',
			existingUser: false,
			signedIn: false,
		}

		this.passwordValueUpdate = this.passwordValueUpdate.bind(this);
		this.formSubmit = this.formSubmit.bind(this);
		this.formSubmitButton = this.formSubmitButton.bind(this);
		this.toggleExistingUser = this.toggleExistingUser.bind(this);
		this.updateEmailValue = this.updateEmailValue.bind(this);
	}

	private updateEmailValue(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const newEmailValue = e.currentTarget.value;
		this.setState({
			emailValue: newEmailValue
		})
	}

	private passwordValueUpdate(newPasswordValue:string) {
		this.setState({
			passwordValue: newPasswordValue
		})
	}

	// Validate email
	private validateEmail() {
		let isValid = false;
		if (!EmailValidator.validate(this.state.emailValue)){
			isValid = false;
			this.setState({
				emailError: true
			})
		} else {
			isValid = true;
			this.setState({
				emailError: false
			})
		};

		return isValid;
	}

	// Validate password
	private validatePassword() {
		let isValid = false;
		if (this.state.passwordValue.length < 6){
			isValid = false;
			this.setState({
				passwordError: true
			})
		} else {
			isValid = true;
			this.setState({
				passwordError: false
			})
		};

		return isValid;
	}

	private formSubmit() {
		if (this.validateEmail() && this.validatePassword()) {
			this.setState({
				signedIn: true,
			}, () => {
				this.props.signedIn(this.state.signedIn);
			})
		}
	}

	private formSubmitButton(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		this.formSubmit();
	}

	private toggleExistingUser() {
		this.setState(prevState => ({
			existingUser: !prevState.existingUser,
		}));
	}

	public render() {

		const { classes } = this.props;

		return(
			<main className={classes.main}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in / Register
					</Typography>
					<form className={classes.form} onSubmit={this.formSubmit}>
						<FormControl margin="normal" error={this.state.emailError} required fullWidth>
							<InputLabel	htmlFor="email">Email Address</InputLabel>
							<Input
								id="email"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={this.updateEmailValue}
							/>
							{this.state.emailError &&
								<FormHelperText>Please enter a valid email</FormHelperText>
							}
						</FormControl>
						<FormControl margin="normal" error={this.state.passwordError} required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<PasswordField passwordError={this.state.passwordError} onChange={this.passwordValueUpdate} />
						</FormControl>
						<ButtonComponent
							onClick={this.formSubmitButton}
							fullWidth={true}
							color='primary'
							type='submit'
							variant='contained'
						>
							{this.state.existingUser ? 'Sign Register' : 'Sign In'}
						</ButtonComponent>
					</form>
					<ButtonComponent
					onClick={this.toggleExistingUser}
					fullWidth={true}
					color='default'
					variant='text'
					type='submit'
					>
						{!this.state.existingUser ? 'Already have an account? Sign In...' : 'New here? Register...'}
					</ButtonComponent>
				</Paper>
			</main>
		)

	}
}

	export default withStyles(styles)(SignInForm);
