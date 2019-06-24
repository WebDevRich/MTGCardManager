import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import SingleCard from '../SingleCard/SingleCard';

const styles = () =>
createStyles({
	transformCard: {
		perspective: 1000,
	},
	transformCardInner: {
		position: 'relative',
		width: '100%',
		height: '100%',
		transition: 'transform .8s',
		transformStyle: 'preserve-3d',
	},
	face: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backfaceVisibility: 'hidden',
	},
	faceTwo: {
		transform: 'rotateY(180deg)',
	},
	cardNotFlipped: {
		transform: 'rotateY(180deg)',
	},
});

export interface TransformCardProps extends WithStyles<typeof styles> {
	faceOneImage: string;
	faceOneName: string;
	faceTwoImage: string;
	faceTwoName: string;
	cardTransform?: string;
}

export interface TransformCardState {
	cardFlipped: boolean;
}

export class TransformCard extends React.PureComponent<TransformCardProps, TransformCardState> {

	constructor(props:TransformCardProps) {
		super(props);

		this.state = {
			cardFlipped: false,
		},

		this.flipCard = this.flipCard.bind(this);
	}

	private flipCard() {
		this.setState({
			cardFlipped: !this.state.cardFlipped,
		});
	}

	public render() {

		const { classes } = this.props;
		const flippedClass = this.state.cardFlipped ? '' : classes.cardNotFlipped;

		return(
			<>
				<div className={classes.transformCard} onClick={this.flipCard}>
					<div className={`${classes.transformCardInner} ${flippedClass}`}>
						<div className={classes.face}>
							<SingleCard alt={this.props.faceOneName} src={this.props.faceOneImage} />
						</div>
						<div className={`${classes.face} ${classes.faceTwo}`}>
							<SingleCard alt={this.props.faceTwoName} src={this.props.faceTwoImage} />
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default withStyles(styles)(TransformCard);
