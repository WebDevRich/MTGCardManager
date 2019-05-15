import * as React from 'react';
import { Button } from '@material-ui/core';

export class PrimaryButton extends React.PureComponent {

	public render() {

		return(
			<Button variant='contained' type='submit' color='primary'>
				{this.props.children}
			</Button>
		)
	}
}

export default PrimaryButton;
