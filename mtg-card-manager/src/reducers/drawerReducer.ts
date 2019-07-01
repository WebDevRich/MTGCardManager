import { IState } from '../initialStates';

export interface Actions {
	type: 'OPEN_DRAWER' | 'CLOSE_DRAWER';
}

export default (state:IState, action:Actions) => {
	switch (action.type) {
		case 'OPEN_DRAWER':
			return {
				...state,
				open: true,
			};
		case 'CLOSE_DRAWER':
			return {
				...state,
				open: false,
			};
		default:
			return state;
	}
};
