import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { fetchClient } from "../utils/fetchClient";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const cache = localStorage.getItem("user");
        if (cache && !user) {
            const parsedCache = JSON.parse(cache);
            const decodedJwt = jwtDecode(parsedCache.jwt);

            if (decodedJwt && decodedJwt.exp) {
                const dateNow = new Date();
                const expiryDate = new Date(decodedJwt.exp * 1000);
                if (dateNow > expiryDate) {
                    clearAuth();
                } else {
                    setUser(JSON.parse(cache));
                }
            } else {
                throw new Error("JWT could not be decoded or did not contain property 'exp'");
            }
        }
    }, []);

    useEffect(() => {
        setAuthReady(true);
    }, [user]);

    const authenticate = async (username, password) => {
        const res = await fetchClient(`/auth/login`, {
            method: "POST",
            body: { username, password }
        });
        return res;
    }

    const setAuth = (token) => {
        const decoded = jwtDecode(token);

        const data = {
            jwt: token,
            id: decoded.id,
            username: decoded.username,
        };

        localStorage.setItem("user", JSON.stringify(data));

        setUser(data);
    }

    const clearAuth = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    const registerUser = async (username, password) => {
        const res = await fetchClient("/auth/register", {
            method: "POST",
            body: { username, password }
        });
        return res;
    };

    return (
        <AuthContext.Provider value={{ authenticate, setAuth, user, clearAuth, registerUser, authReady }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;