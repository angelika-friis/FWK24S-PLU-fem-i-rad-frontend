import { StartNewGame } from "5irad-components";
import { useApi } from "../providers/ApiProvider";

const Lobby = () => {
    return (
        <div>
            <StartNewGame useApi={useApi} />
        </div>
    )
}
export default Lobby