import{
 SIGNUP_SUCCESS,
 SIGNUP_FAILURE,
 SIGNUP_LOADING,
 AUTH_INPUT_CHANGE,
} from '../actions/actionTypes';


const initialState = {
  firstName: {value:'',error:''},
  lastName: {value:'',error:''},
  studentID: {value:'',error:''},
  phone: {value:'',error:''},
  dateOfBirth: {value:'',error:''},
  email: {value:'',error:''},
  centerName: {value:'',error:''},
  user: {},
  error: '',
  signup_loading: false,
  signup_valid: false,
  centres: []
};

export default (state = initialState, action) => {
    console.log('reducer');
  switch (action.type) {
    case AUTH_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        //{value:action.payload.value,error:''},
        //email: action.email,
        //password: action.password,
      };
    case SIGNUP_SUCCESS:
      console.log('SIGNUP_SUCCESS');
      return {
        ...state,
        user: action.payload,
        error:'',
        //signup_valid: action.payload,
        signup_loading: false,
      };
    case SIGNUP_FAILURE:
      console.debug('SIGNUP_FAILURE');
      console.log('SIGNUP_FAILURE');
      return {
        ...state,
        error: "You already have an account/Your details doesn't match records",
        signup_loading: false,
      };
    case SIGNUP_LOADING:
       console.debug('loading reducer');
       return {
         ...state,
         signup_loading: true,
       };

    default:
      return state;
  }
};
