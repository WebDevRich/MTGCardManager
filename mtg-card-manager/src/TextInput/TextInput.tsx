import * as React from 'react';
import { InputBase } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
// import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';

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

	constructor(props: TextInputProps) {
		super(props)

		this.state = {
			// activeSuggestion: 0,
			// filteredSuggestions: [],
			// showSuggestions: false,
			inputValue: '',
      // suggestions: [],
		}
	}

	private inputValueChange(value:any) {
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
	};

	public render() {

		const { classes } = this.props;

		return(
			<>
				<InputBase
					placeholder={this.props.placeholder}
					className={classes.inputInput}
					onChange={event => this.inputValueChange(event.target.value)}
				/>
				{/* {this.state.showSuggestions &&
					<SearchSuggestions searchSuggestions={this.props.searchSuggestions} inputValue={this.inputValueChange} />
				} */}
			</>
		)
	}

}

export default withStyles(styles)(TextInput);
