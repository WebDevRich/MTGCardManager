import { InputBase } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
// import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';

const styles = (theme:Theme) =>
	createStyles({
		inputInput: {
			paddingTop: theme.spacing(1),
			paddingRight: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			paddingLeft: theme.spacing(1),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: 200,
			},
		},
	});

export interface TextInputProps extends WithStyles<typeof styles> {
	inputValue(value:string):void;
	placeholder: string;
	// searchSuggestions: string[];
}

export interface TextInputState {
	// activeSuggestion: number;
	// filteredSuggestions: string[];
	// showSuggestions: boolean;
	inputValue: string;
	// suggestions: string[];
}

export class TextInput extends React.PureComponent<TextInputProps, TextInputState> {

	// private showSuggestions = this.props.searchSuggestions.length < 30;

	constructor(props:TextInputProps) {
		super(props);

		this.state = {
			// activeSuggestion: 0,
			// filteredSuggestions: [],
			// showSuggestions: false,
			inputValue: '',
			// suggestions: [],
		};

		this.inputValueChange = this.inputValueChange.bind(this);
	}

	private inputValueChange(e:React.ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;
		// console.log(value);
		// const { searchSuggestions } = this.props;

		// if (this.state.inputValue.length > 3) {
		// 	console.log('hello');
		// 	const filteredSuggestions = searchSuggestions.filter(
		// 		suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
		// 	);

		// 	this.setState({
		// 		filteredSuggestions,
		// 	});
		// }

		this.setState({
			inputValue: value,
			// showSuggestions: this.state.filteredSuggestions.length < 10,
		}, () => {
			this.props.inputValue(this.state.inputValue);
		});
	}

	public render() {

		const { classes } = this.props;

		return(
			<>
				<InputBase
					placeholder={this.props.placeholder}
					className={classes.inputInput}
					onChange={this.inputValueChange}
				/>
				{/* {this.state.showSuggestions &&
					<SearchSuggestions searchSuggestions={this.props.searchSuggestions} inputValue={this.inputValueChange} />
				} */}
			</>
		);
	}

}

export default withStyles(styles)(TextInput);
