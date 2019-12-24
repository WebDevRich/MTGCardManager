import { IState } from '../initialStates';

export interface Actions {
	type: 'TOGGLE_DRAWER' | 'SET_CURRENT_USER';
	payload?: any;
}

export default (state:IState, action:Actions) => {
	switch (action.type) {
		case 'TOGGLE_DRAWER':
			return {
				...state,
				isDrawerOpen: !state.isDrawerOpen,
			};
		case 'SET_CURRENT_USER':
			return {
				...state,
				userEmail: action.payload,
			};
		default:
			return state;
	}
};
