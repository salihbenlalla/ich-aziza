import { Events, EventsState } from './eventsTypes';

const initialState: EventsState = {
    addPostEvent: false,
};

const eventsReducer = (state: EventsState = initialState, action: Events) => {
    switch (action.type) {
        case 'event/addPost':
            return { ...state, addPostEvent: action.payload };
        default:
            return state;
    }
};

export default eventsReducer;
