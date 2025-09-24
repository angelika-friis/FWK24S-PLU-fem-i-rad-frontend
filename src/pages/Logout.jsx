import { LoginForm } from "5irad-components";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { clearAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        clearAuth();
        navigate("/login");
    }, []);

    return (
        <></>
    )
}

export default Logout;