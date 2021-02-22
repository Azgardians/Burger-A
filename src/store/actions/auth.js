import * as actionTypes from './actionTypes';
import axios from "axios"
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken , userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkTokenValidity = (expirationTime) =>{
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime*1000)
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const auth = (email, password , isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvzO_k6_-hOEmOJgUuEfUlD7KId5uyUL4"
        if (!isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvzO_k6_-hOEmOJgUuEfUlD7KId5uyUL4"
        }
        axios.post(url, authData )
            .then((res)=>{
                console.log(res.data)
                dispatch(authSuccess(res.data.idToken , res.data.localId));
                dispatch(checkTokenValidity(res.data.expiresIn));
            })
            .catch((err)=>{
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    };
};