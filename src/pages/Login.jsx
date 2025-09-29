import { LoginForm, Toaster } from "@akkelw/5irad-components";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { authenticate, setAuth } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [toasterKey, setToasterKey] = useState(0);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setToasterKey(toasterKey + 1);

        try {
            const res = await authenticate(username, password);

            if (res.status !== 200) {
                setError(res.data.message || "Something went wrong");
            }
            else {
                setError("")
                setAuth(res.data.jwt);
                navigate("/");
            }

        } catch (error) {
            console.log(error);
            setError(error.message || "Something went wrong. Try again later.");
        }
    }

    return (
        <div>
            <LoginForm
                onSubmit={onSubmit}
                setUsername={setUsername}
                setPassword={setPassword}
            />
            {error && <Toaster
                type="error"
                msg={error}
                id={toasterKey}
            />}
        </div>
    )
}

export default Login;