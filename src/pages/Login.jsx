import { LoginForm } from "5irad-components";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { authenticate, setAuth } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const result = await authenticate(username, password);

            if(!result) {
                console.log(result.message);
                return;
            }

            setAuth(result.jwt);

            navigate("/lobby");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            <LoginForm 
                onSubmit={onSubmit} 
                setUsername={setUsername}
                setPassword={setPassword}
            />
        </div>
    )
}
export default Login