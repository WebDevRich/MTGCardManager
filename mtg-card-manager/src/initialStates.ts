export interface IState {
	isDrawerOpen: boolean;
	userId: string;
}

export const initialState:IState = {
	isDrawerOpen: false,
	userId: '',
};
