import {
  AUTH_ADD_CONTENT,
  ADD_CONTENT_FAILURE,
  ADD_CONTENT_SUCCESS,
  LOADING
} from './actionTypes';
import config from '../config/index.js';

export const authContentChange = ({ field, value }) => {
  return {
    type: AUTH_ADD_CONTENT,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const addContent = ({ contentURL, contentType, contentDesc, assessmentURL }) => {
  console.log('in add Content action');
   return dispatch => {
     dispatch({ type: LOADING });
     fetch(config.baseurl+'/api/v1/content/request', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         contentURL: contentURL,
         contentType: contentType,
         contentDesc: contentDesc,
         assessmentURL: assessmentURL
       }),
     })
//       .then(response => response.json())
       .then(res => {
         console.log('result SDFGHJ : '+res.text());
         //const content_valid = res;
        /* if(res.errorMessage){
            dispatch({ type: ADD_CONTENT_FAILURE, payload: res.errorMessage });
         } else*/
         dispatch({ type: ADD_CONTENT_SUCCESS, payload : res });
       })
       .catch(error => {
         console.log('going into error :P');
         dispatch({ type: ADD_CONTENT_FAILURE, payload: 'Cannot add data' });
       });

   };
};
