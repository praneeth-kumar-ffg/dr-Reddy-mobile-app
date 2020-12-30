import config from '../config/index.js';
import {SUBMIT_HELP_SUCCESS, SUBMIT_HELP_FAILURE,HELP_EMPTY_DETAILS,LOADING,HELP_CLEAR} from './actionTypes';


export const userSubmitEmptyDetails = (prblmType, prblmDesc, additionalDetails) =>{

  if(prblmDesc =='' || prblmType == ''){
    return dispatch => {
      dispatch({ type: HELP_EMPTY_DETAILS });
    }
  }
}

export const clearDetails = () =>{
    return dispatch =>{
      dispatch({type: HELP_CLEAR});
    } 
}
export const userSubmitHelp = ( prblmType, prblmDesc, additionalDetails,aspirantId,centerId ) =>{
    const userHelpDetails={
        prblmType:'abc',
        prblmDesc:'abc',
        additionalDetails:'',
        aspirantId:''
    }
   return dispatch => {
        dispatch({ type: LOADING });
        fetch(config.baseurl+'/api/v1/help', {
          method: 'POST',
          body: JSON.stringify({
            aspirantId:aspirantId,
            reason: prblmType,
            details: prblmDesc,
            description: additionalDetails,
            centerId:centerId
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;  charset=UTF-8',
          }
        })
          .then(response => {
            if(response.status == 200){
              dispatch({ type: SUBMIT_HELP_SUCCESS });
            }
            response.json()})
          .catch(error => {
            console.error(error);
            dispatch({ type: SUBMIT_HELP_FAILURE });
          });
   }
  }

