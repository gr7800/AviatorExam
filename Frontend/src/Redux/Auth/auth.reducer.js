import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT,SPECIAL_ACCESS } from "./auth.types";

let token = localStorage.getItem("user");
const intialState = {
    isAuth: false,
    specialAccess: false,
    adminAuth: false,
    token: token,
    user: {},
    loading: false,
    error: false,
    errorMessage: "",
};

export const authReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case SPECIAL_ACCESS: {
            return {
                ...state,
                specialAccess: payload,
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem("useraviaton", JSON.stringify(payload.userpersent));
            localStorage.setItem("token", JSON.stringify(payload.token));
            return {
                ...state,
                adminAuth: (payload.userpersent.email === "cto.aviatorcloud@gmail.com") ? true : false,
                isAuth: true,
                token: payload.token,
                user: payload.userpersent,
                loading: false,
                error: false,
            }
        }
        case LOGIN_ERROR: {

            return {
                ...state,
                isAuth: false,
                loading: false,
                error: true,
                errorMessage: payload
            }
        }

        case LOGOUT: {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {
                ...state,
                isAuth: false,
                user: "",
            }
        }
        default: {
            return state;
        }
    }
}