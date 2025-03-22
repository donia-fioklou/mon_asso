import { createContext, useEffect, useReducer } from "react";
import { refreshToken } from "../pages/auth/service";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
    token: localStorage.getItem("token"),
    refresh: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        if (state.refresh) {
            refreshToken()
        } else {
            localStorage.setItem("token", state.token);
        }
    }, [state.token || state.refresh]);

    return (
        <AuthContext.Provider value={{ token: state.token, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
