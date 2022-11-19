import axios from "axios";
import { DEL_USER_FAIL, DEL_USER_SUCCESS, GET_USER_FAIL, GET_USER_LOADING, GET_USER_SUCCESS, PUT_USER_FAIL, PUT_USER_SUCCESS } from "../const/user";
import { setAlert } from "./alert";

export const updateUser = (newUser) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/users`,
      newUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({type : PUT_USER_SUCCESS,payload : response.data})
    dispatch(setAlert({msg : response.data.msg, variant : 'success'}));
    dispatch(getUser())
  } catch (error) {
    dispatch({ type: PUT_USER_FAIL, payload: error });
    dispatch(setAlert({msg : error.response.data.msg, variant : 'danger'}));
    console.log(error);
  }
};

export const getUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({type : GET_USER_LOADING})
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({type : GET_USER_SUCCESS,payload : response.data})
  } catch (error) {
    dispatch({ type: GET_USER_FAIL, payload: error });
    dispatch(setAlert({msg : error.response.data.msg, variant : 'danger'}));
    console.log(error);
  }
};

export const deleteUser = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({type : DEL_USER_SUCCESS,payload : response.data})
      dispatch(setAlert({msg : response.data.msg, variant : 'success'}));
      dispatch(getUser())
    } catch (error) {
      dispatch({ type: DEL_USER_FAIL, payload: error });
      dispatch(setAlert({msg : error.response.data.msg, variant : 'danger'}));
      console.log(error);
    }
  };