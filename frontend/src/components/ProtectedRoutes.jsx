import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
// On the higher side read about protected routes in react-router-dom

function ProtectedRoute({ children }) {
    // we need to check whether the user is authenticated or not
    // before accessing this route if not then they need to login
    // we will check the token in the local storage
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []); // Bhai use effect kya hota hai, read about it, abhi tak nahi padha
    // Pore pore nish bhai, nahole chaap hobe

    const refreshToken = async () => {
        // get the refresh token from the local storage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh : refreshToken,
            });
            if(res.status === 200) {
                const newAccessToken = res.data.access;
                localStorage.setItem(ACCESS_TOKEN, newAccessToken);
                setIsAuthorized(true);
            } else{
                setIsAuthorized(false);
            }
        } catch (error) {
            // if the refresh token is invalid
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        // check if the token is present in the local storage
        // if not then the user is not authenticated
        // route the user to the login page
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if(tokenExpiration < now) {
            // token has expired
            // we need to refresh the token
            await refreshToken();
        } else {
            // token is valid
            // the user is authenticated
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;  // we will use this component to protect the routes that need authentication