import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = () =>
	createStyles({
		suggestionsList: {
			position: 'absolute',
			listStyle: 'none',
			margin: 0,
			padding: 10,
		},
		suggestion: {
			padding: 5,
		},
		activeSuggestions: {
			backgroundColor: 'blue',
		},
	});

export interface SearchSuggestionsProps extends WithStyles<typeof styles> {
	inputValue(value:string):void;
	searchSuggestions: string[];
}

export interface SearchSuggestionsState {
	activeSuggestion: number;
	inputValue: string;
}

export class SearchSuggestions extends React.PureComponent<SearchSuggestionsProps, SearchSuggestionsState> {

	constructor(props:SearchSuggestionsProps) {
		super(props);

		this.state = {
			activeSuggestion: 0,
			inputValue: '',
		};
	}

	// Event fired when the user clicks on a suggestion
	private suggestionSelected(e:React.MouseEvent<HTMLLIElement>) {
		const value = e.currentTarget.innerText;
		console.log(value);
		// Update the user input and reset the rest of the state
		this.setState({
			activeSuggestion: 0,
			// userInput: value,
		}, () => {
			this.props.inputValue(this.state.inputValue);
		});
	}

	public render() {

		const { classes } = this.props;

		return(
			<ul className={classes.suggestionsList}>
				{this.props.searchSuggestions.map((suggestion, index) => {
					let className;

					// Flag the active suggestion with a class
					if (index === this.state.activeSuggestion) {
						className = classes.activeSuggestions;
					}

					return (
						<li
							className={`${suggestion} ${className}`}
							key={suggestion}
							onClick={this.suggestionSelected}
						>
							{suggestion}
						</li>
					);
				})}
			</ul>
		);
	}
}

export default withStyles(styles)(SearchSuggestions);
