import { StartNewGame } from "5irad-components";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
    const navigate = useNavigate();

    return (
        <StartNewGame onRedirect={navigate} />
    )
}
export default Lobby