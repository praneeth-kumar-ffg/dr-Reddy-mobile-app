import {
  AUTH_GET_CONTENT,
  GET_CONTENT_FAILURE,
  GET_CONTENT_SUCCESS
} from './actionTypes';

export const authContentGet = ({ field, value }) => {
  return {
    type: AUTH_GET_CONTENT,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const getContent = ({ url, description, assessURL }) => {
  console.debug('in get Content action');
  console.debug(url);
  console.debug(description);
  console.debug(assessURL)

  const content = {
    url: 'abc',
    assessURL: 'abc',
    description: 'abc'
  };

  return dispatch => {
    dispatch({ type: GET_CONTENT_SUCCESS, payload: content });
  };

  // return dispatch => {
  //   dispatch({ type: LOADING });
  //   fetch('http://10.0.2.2:8080/getContent', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(res => {
  //       console.debug(res);
  //       dispatch({ type: GET_CONTENT_SUCCESS });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       dispatch({ type: GET_CONTENT_FAILURE });
  //     });
  // };
};
