import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = () =>
	createStyles({
		singleCard: {
			gridColumn: 'span 1',
			borderRadius: 4,
			overflow: 'hidden',
			boxShadow: '1px 1px 2px 0px rgba(0,0,0,0.5)',
			'& img': {
				width: '100%',
				height: 'auto',
			},
		},
	});

export interface SingleCardProps extends WithStyles<typeof styles> {
	src: string;
	alt: string;
}

export class SingleCard extends React.PureComponent<SingleCardProps> {

	public render() {

		const { classes } = this.props;

		return(
			<div className={classes.singleCard}>
				<img src={this.props.src} alt={this.props.alt} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleCard);
