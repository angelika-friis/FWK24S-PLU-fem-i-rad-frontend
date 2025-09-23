import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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

    return (
        <AuthContext.Provider value={{ authenticate }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;