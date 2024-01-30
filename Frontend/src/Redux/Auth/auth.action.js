// import axios from "axios";
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, SPECIAL_ACCESS } from "./auth.types";
import { BaseUrl } from "../../utills/helper";

export const login = (creds) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const response = await fetch(`${BaseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();

    if (data.message === "Login successful") {
      dispatch({ type: LOGIN_SUCCESS, payload: data })
      alert(data.message);
    } else {
      alert(data.message);
    }
    return data;
  }
  catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e.message })
    console.log(e)
  }
}


export const updateScore = (creds) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("useraviaton"))
  try {
    const response = await fetch(`${BaseUrl}/api/profileupdate/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    alert(data.message);
    localStorage.setItem("useraviaton", JSON.stringify(data.user))
    return data;
  }
  catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e.message })
    console.log(e)
  }
}

export const GetOtp = async (creds) => {
  try {
    const response = await fetch(`${BaseUrl}/api/getotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    return data;
  }
  catch (e) {
    console.log(e)
  }
}

export const getAllUser = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let res = await fetch(`${BaseUrl}/api/alluser`, {
    method: 'GET',
    headers: {
      'token': token
    }
  })
  let data = await res.json();
  return data.user;
}

export const singleuser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    let res = await fetch(`${BaseUrl}/api/singleuser`, {
      method: 'GET',
      headers: {
        'token': token
      }
    })
    let data = await res.json();
    dispatch({ type: LOGIN_SUCCESS, payload: data })
    return data.user;
  } catch (error) {
    console.log(error);
  }
}

export const deleteAuser = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  let res = await fetch(`${BaseUrl}/api/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'token': token
    }
  })
  let data = await res.json();
  alert(data.message)
  return data.user;
}

export const forgetpassword = async (creds) => {
  try {
    const response = await fetch(`${BaseUrl}/api/updatepassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    alert(data.message);
    if (data.message === "Password updated successfully") {
      return data;
    } else {
      return data;
    }
  }
  catch (e) {
    console.log(e)
  }
}

export const SpecialAcess = (creds) => (dispatch) => {
  dispatch({ type: SPECIAL_ACCESS, payload: creds })
}

const authlogout = () => {
  localStorage.removeItem("useraviaton");
  localStorage.removeItem("token");
  window.location.reload();
}

export default authlogout;
