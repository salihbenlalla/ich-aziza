import { combineReducers } from 'redux';
import { authReducer } from './authSlice/authReducer';
import eventsReducer from './eventsSlice/eventsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    events: eventsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
