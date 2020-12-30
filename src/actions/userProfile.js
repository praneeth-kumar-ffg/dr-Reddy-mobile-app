import {   
  PROFILE_UPDATE_SUCCESS,
  PASSWORD_CHANGE_SUCCESS
} from './actionTypes';


export const changePassword = () => {
  return {
    type: PASSWORD_CHANGE_SUCCESS,
    payload: {value: 'test'},
  };
}; 

export const updateProfile = ( userProfile ) => {
  console.log(userProfile)
  return {
    type: PROFILE_UPDATE_SUCCESS,
    payload: userProfile,
  };
};
