import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { API_BASE_URL } from "../../utils/constants";

export const refreshToken = () => {
    fetch(`${API_BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refresh: localStorage.getItem('refresh')
        })
    }).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                localStorage.setItem('token', data.access);
            })
        }
    })
}

export const useHandleExpiredToken = () => {
    const { dispatch } = useContext(AuthContext);

    const handleExpiredToken = () => {
        dispatch({ type: "TOKEN_EXPIRED", payload: localStorage.getItem('refresh') });
    };

    return handleExpiredToken;
};