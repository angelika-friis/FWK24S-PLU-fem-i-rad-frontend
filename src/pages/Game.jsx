import { Board } from "@akkelw/5irad-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../providers/ApiProvider";
import { useBoard } from "@akkelw/5irad-board-ctx";
import { useConnection } from "../providers/ConnectionProvider";

const Game = () => {
    const { tiles, validateBoard, setTiles, setCurrentGameId } = useBoard();
    const { connect, disconnect } = useConnection();
    const { getTiles } = useApi();
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!params.gameId) {
            disconnect();
            navigate("/");
            return;
        }

        const checkValidate = async () => {
            const result = await validateBoard(params.gameId);
            if(!result) {
                disconnect();
                navigate("/");
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
                setCurrentGameId(params.gameId);
                setTiles(result);
                connect();
            }

            fetchTiles();
        }
    }, [loading]);

    return loading ? <>Loading...</> : <Board tiles={tiles} />;
}
export default Game