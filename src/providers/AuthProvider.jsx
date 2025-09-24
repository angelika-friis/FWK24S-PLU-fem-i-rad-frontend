import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const cache = localStorage.getItem("user");
        if(cache && !user) {
            const parsedCache = JSON.parse(cache);
            const decodedJwt = jwtDecode(parsedCache.jwt);

            if(decodedJwt && decodedJwt.exp) {
                const dateNow = new Date();
                const expiryDate = new Date(decodedJwt.exp*1000);
                if(dateNow > expiryDate) {
                    clearAuth();
                } else {
                    setUser(JSON.parse(cache));
                }
            } else {
                throw new Error("JWT could not be decoded or did not contain property 'exp'");
            }
        }
    }, []);

    const authenticate = async (username, password) => {
        const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        let data = null;
        try {
            data = await res.json();
        } catch(error) {
            throw new Error("Could not perform authentication!", error)
        }
        
        if(res.ok && res.status == 200) {
            return data;
        } else {
            throw new Error(data.message);
        }
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

    return (
        <AuthContext.Provider value={{ authenticate, setAuth, user, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;