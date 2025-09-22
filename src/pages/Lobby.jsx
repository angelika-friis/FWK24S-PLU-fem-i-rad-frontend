import { StartNewGame } from "5irad-components";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
    const navigate = useNavigate();

    return (
        <div>
            <StartNewGame onRedirect={navigate} />
        </div>
    )
}
export default Lobby