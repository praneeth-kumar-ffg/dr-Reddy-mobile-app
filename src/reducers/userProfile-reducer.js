import {
    AUTH_INPUT_CHANGE,
    PROFILE_UPDATE_FAILURE,
    PROFILE_UPDATE_SUCCESS,
    LOADING,
  } from '../actions/actionTypes';
  
  const initialState = {
    email: '',
    password: '',
    user: {},
    error: '',
    loading: false,
    userProfile: {},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case AUTH_INPUT_CHANGE:
        return {
          ...state,
          [action.payload.field]: action.payload.value,
          //email: action.email,
          //password: action.password,
        };
      case PROFILE_UPDATE_SUCCESS:
        console.debug('PROFILE_UPDATE_SUCCESS');
        return {
          ...state,
          userProfile: action.payload,
          loading: false,
        };
      case PROFILE_UPDATE_FAILURE:
        console.debug('PROFILE_UPDATE_FAILURE');
        return {
          ...state,
          error: 'Profile update failed',
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
  