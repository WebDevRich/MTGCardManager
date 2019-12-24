export interface IState {
	isDrawerOpen: boolean;
	userEmail: string;
}

export const initialState:IState = {
	isDrawerOpen: false,
	userEmail: '',
};
