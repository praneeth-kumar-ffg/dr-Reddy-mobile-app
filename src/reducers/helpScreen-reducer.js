import {SUBMIT_HELP_SUCCESS, SUBMIT_HELP_FAILURE, LOADING,HELP_EMPTY_DETAILS,HELP_CLEAR} from './../actions/actionTypes';


const initialHelpState={
    aspirantId:'',
    prblmType:'',
    prblmDesc:'',
    additionalDetails:'',
    centerId:'',
    error:'',
    loading: false,
    message:''
};

export default (state = initialHelpState, action) => {
    switch(action.type){
        case SUBMIT_HELP_SUCCESS:
            return{
                ...state,
               /* aspirantId:action.aspirantId,
                prblmType : action.prblmType,
                prblmDesc : action.prblmDesc,
                additionalDetails : action.additionalDetails ,
                centerId:action.centerId,*/
               // message:action.payload,
                loading: false,
                error: 'Help Details Submitted'
            };
        case SUBMIT_HELP_FAILURE:
            return{
                ...state,
                error: 'Help History Details Submission failed',
                loading: false,
            };
            case LOADING:
                console.debug('loading reducer');
                return {
                  ...state,
                  loading: true
                };
        case HELP_EMPTY_DETAILS :
            return{
                ...state,
                error: 'Please Fill all the Details, before you submit',
                loading: false,
            }
        case HELP_CLEAR:
            return{
                ...state,
                loading: false,
                error: ''
            }
        default:
            return state;
    }
};