import { Board } from "5irad-components";
import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../providers/BoardProvider";
import { useNavigate, useParams } from "react-router-dom";

const Game = () => {
    const { tiles, validateBoard } = useContext(BoardContext);
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkValidate = async () => {
            const result = await validateBoard(params.gameId);
            if(!result) {
                navigate("/lobby");
                return;
            }

            setLoading(false);
        }

        checkValidate();
    }, [navigate, validateBoard, params]);

    return loading ? <>Loading...</> : <Board tiles={tiles} />;
}
export default Game