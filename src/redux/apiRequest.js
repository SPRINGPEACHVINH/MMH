import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "../slices/counterSlice";

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/user/signin", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch(err) {
        dispatch(loginFailed());        
    }
};

export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("/api/user/signup", user);
        dispatch(registerSuccess());
        navigate("/signin");
    } catch(err) {
        dispatch(registerFailed());
    }
};
