import {
  AUTH_INPUT_CHANGE,
  HELP_REQUEST_SUCCESS,
  HELP_REQUEST_FAILURE,
  LOADING,
} from './actionTypes';


export const authInputChange = ({ field, value }) => {
  return {
    type: AUTH_INPUT_CHANGE,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const adminHelpRequest = ({ helpRequest }) => {
  if (helpRequest) {
    console.log('dispatching helprequests', helpRequest)
    return dispatch => {
      dispatch({ type: HELP_REQUEST_SUCCESS, payload: { helpRequest } })
    }
  }
  else {
    return dispatch => {
      dispatch({ type: HELP_REQUEST_FAILURE, payload: "ERROR" })
    }
  }
}

