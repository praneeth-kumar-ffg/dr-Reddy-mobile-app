import {
  AUTH_DELETE_CONTENT,
  DELETE_CONTENT_FAILURE,
  DELETE_CONTENT_SUCCESS
} from './actionTypes';

export const authContentDelete = ({ field, value }) => {
  return {
    type: AUTH_DELETE_CONTENT,
    payload: { field, value }, //field: 'email', 'text'
  };
};

export const deleteContent = ({ url, description, assessURL }) => {
  console.debug('in delete Content action');
  console.debug(url);
  console.debug(description);
  console.debug(assessURL)

  const content = {
    url: 'abc',
    assessURL: 'abc',
    description: 'abc'
  };

  return dispatch => {
    dispatch({ type: DELETE_CONTENT_SUCCESS, payload: content });
  };

  // return dispatch => {
  //   dispatch({ type: LOADING });
  //   fetch('http://10.0.2.2:8080/deleteContent', {
  //     method: 'DELETE',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       url: url,
  //       assessURL: assessURL,
  //       description: description
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(res => {
  //       console.debug(res);
  //       dispatch({ type: DELETE_CONTENT_SUCCESS, payload: user });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       dispatch({ type: DELETE_CONTENT_FAILURE });
  //     });
  // };
};
