import{
     AUTH_GET_CONTENT,
      GET_CONTENT_FAILURE,
      GET_CONTENT_SUCCESS,
      LOADING
} from '../actions/actionTypes';

const initialState = {
  url: '',
  description: '',
  assessURL: '',
  content: {},
  error: '',
  content_valid: 'true',
  loading: 'false'
};

export default (state = initialState, action) => {
    console.log('reducer');
  switch (action.type) {
    case AUTH_GET_CONTENT:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case GET_CONTENT_SUCCESS:
      console.log('GET_CONTENT_SUCCESS');
      return {
        ...state,
        //user: action.payload,
        content_valid: action.payload,
        error:'No Idea',
        loading: false,
      };
    case GET_CONTENT_FAILURE:
      console.debug('GET_CONTENT_FAILURE');
      return {
        ...state,
        error: 'Fetch failed',
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