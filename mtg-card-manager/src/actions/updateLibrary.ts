import axios from 'axios';
// Update Library
export const updateLibrary = (libraryData:any, callBack:any) => {
	axios
		.post('/api/library/updateLibrary', libraryData)
		// re-direct to login on successful register
		.then(res => {
			callBack(res);
		})
		.catch(err => {
			callBack(err.response);
		});
};
