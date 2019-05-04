import * as React from 'react';
import { theme } from '../index';

export interface SearchBarState {
	searchTerm: string;
}

export class SearchBar extends React.PureComponent<{}, SearchBarState> {

	private styles = {
		searchBox: {
			gridColumnStart: 1,
			gridColumnEnd: -1,
			padding: 20,
			display: 'flex',
			justifyContent: 'center',
			backgroundColor: theme.palette.primary.main
		}
	}

	constructor(props:any) {
		super(props)

		this.state = {
			searchTerm: '',
		}
	}

	public render() {

		return (
			<div style={this.styles.searchBox}>
				Search Box
			</div>
		);
	}
}

	export default SearchBar
