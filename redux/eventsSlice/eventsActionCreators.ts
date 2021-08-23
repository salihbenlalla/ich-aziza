import { eventsActionTypes } from './eventsActionTypes';

const setAddPost = (addPost: boolean) => {
    return {
        type: eventsActionTypes.EVENT_ADD_POST,
        payload: addPost,
    };
};

export { setAddPost };
