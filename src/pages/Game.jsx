import { Board } from "5irad-components";
import { useContext } from "react";
import { BoardContext } from "../providers/BoardProvider";

const Game = () => {
    const { tiles } = useContext(BoardContext);

    return (
        <div>
            <Board tiles={tiles} />
        </div>
    )
}
export default Game