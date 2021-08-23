import { RootState } from '../combineReducers';
export const selectAddPostEvent = (state: RootState) => {
    return state.events?.addPostEvent;
};
