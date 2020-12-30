import{
     AUTH_DELETE_CONTENT,
      DELETE_CONTENT_FAILURE,
      DELETE_CONTENT_SUCCESS,
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
    case AUTH_DELETE_CONTENT:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case DELETE_CONTENT_SUCCESS:
      console.log('DELETE_CONTENT_SUCCESS');
      return {
        ...state,
        //user: action.payload,
        content_valid: action.payload,
        error:'No Idea',
        loading: false,
      };
    case DELETE_CONTENT_FAILURE:
      console.debug('ADD_CONTENT_FAILURE');
      return {
        ...state,
        error: 'Please enter Valid Data',
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