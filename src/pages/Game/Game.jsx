import { Board, PlayerTurn } from "@akkelw/5irad-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../providers/ApiProvider";
import { useBoard } from "@akkelw/5irad-board-ctx";
import styles from './Game.module.css';

const Game = () => {
    const { tiles, validateBoard, setTiles, playerTurn } = useBoard();
    const { getTiles } = useApi();
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!params.gameId) {
            navigate("/");
            return;
        }

        const checkValidate = async () => {
            const result = await validateBoard(params.gameId);
            if(!result) {
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
                setTiles(result);
            }

            fetchTiles();
        }
    }, [loading]);

    return (
        loading 
        ? <>Loading...</> 
        : <div className={styles.GameContentContainer}>
            <PlayerTurn player={playerTurn}/>
            <div className={styles.BoardContainer}>
            <Board tiles={tiles} className={styles.Board}/>
            </div>
        </div>
    );
}
export default Game