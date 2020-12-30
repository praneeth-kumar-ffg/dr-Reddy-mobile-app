import {
    AUTH_INPUT_CHANGE,
    HELP_REQUEST_SUCCESS,
    HELP_REQUEST_FAILURE,
    LOADING,
} from '../actions/actionTypes';

const initialState = {
    error: '',
    adminHelp: [],
    loading: '',
};

export default (state = initialState, action) => {
    console.log('reducer');
    switch (action.type) {
        case AUTH_INPUT_CHANGE:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case HELP_REQUEST_SUCCESS:
            console.log('HELP_REQUEST_SUCCESS');
            return [
                ...state,
                //user: action.payload,
                {
                    adminHelp: action.payload,
                    loading: false
                }
            ];
        case HELP_REQUEST_FAILURE:
            console.debug('HELP_REQUEST_FAILURE');
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case LOADING:
            console.debug('loading reducer');
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};