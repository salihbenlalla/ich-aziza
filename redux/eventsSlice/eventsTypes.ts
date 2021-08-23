import { eventsActionTypes } from './eventsActionTypes';
export type AddPostEventAction = {
    type: eventsActionTypes.EVENT_ADD_POST;
    payload: boolean;
};
export type EventsState = {
    addPostEvent: boolean;
};

export type Events = AddPostEventAction;
