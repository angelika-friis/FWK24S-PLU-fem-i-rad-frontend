import { Board } from "5irad-components";
import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../providers/BoardProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../providers/ApiProvider";

const Game = () => {
    const { tiles, validateBoard, setTiles } = useContext(BoardContext);
    const { getTiles } = useApi();
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

    useEffect(() => {
        if(!loading) {
            const fetchTiles = async () => {
                const result = await getTiles(params.gameId);
                setTiles(result);
            }

            fetchTiles();
        }
    }, [loading]);

    return loading ? <>Loading...</> : <Board tiles={tiles} />;
}
export default Game