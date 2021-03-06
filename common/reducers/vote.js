import * as ACTIONS from '../actions/vote';


export default function Vote(state = {}, action = {}) {
    switch (action.type) {
        case ACTIONS.LOAD_VOTE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
