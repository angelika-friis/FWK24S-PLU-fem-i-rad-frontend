import { RegisterForm, Toaster } from "5irad-components";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [toasterKey, setToasterKey] = useState(0);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setToasterKey(toasterKey + 1);

        try {
            const res = await registerUser(username, password);
            if (res.status !== 201) {
                setError(res.data.message || "Something went wrong");
            }
            else {
                setError("")
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            setError(error.message || "Something went wrong. Try again later.");
        }
    }

    return (
        <div>
            <RegisterForm
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

export default Register;