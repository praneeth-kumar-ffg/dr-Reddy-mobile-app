import{
     AUTH_ADD_CONTENT,
      ADD_CONTENT_FAILURE,
      ADD_CONTENT_SUCCESS,
      LOADING
} from '../actions/actionTypes';

const initialState = {
  contentURL: '',
  contentDesc: '',
  assessmentURL: '',
  contentType: '',
  error: '',
  contentResponse: '',
  loading: 'false',
};

export default (state = initialState, action) => {
//  console.log('reducer');
  switch (action.type) {
    case AUTH_ADD_CONTENT:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case ADD_CONTENT_SUCCESS:
      console.log('ADD_CONTENT_SUCCESS');
      return {
        ...state,
        contentResponse: action.payload,
        error:'No Idea',
        loading: false,
      };
    case ADD_CONTENT_FAILURE:
      console.log('ADD_CONTENT_FAILURE');
      return {
        ...state,
        error: 'Please enter Valid Data',
        loading: false,
      };
    case LOADING:
       console.log('loading reducer');
       return {
         ...state,
         loading: true,
       };

    default:
      return state;
  }
};
