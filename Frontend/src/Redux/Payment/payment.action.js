import { QBaseUrl } from "../../utills/helper";

export const paymentRequest = (creds) => async (dispatch) => {
  try {
    const response = await fetch(`${QBaseUrl}/payreq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("avitorPaymentInfo", JSON.stringify(data.data))
    }
    return data;
  }
  catch (e) {
    console.log(e)
    return;
  }
}

export const paymentDetails = (creds) => async (dispatch) => {
  try {
    const response = await fetch(`${QBaseUrl}/paydetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return;
  }
}

export const StoreandUpdate = (creds) => async (dispatch) => {
  try {
    const response = await fetch(`${QBaseUrl}/storepayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return;
  }
}

export const getPaymentInfo = async(email) => {
  try {
    const response = await fetch(`${QBaseUrl}/payments/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return;
  }
}