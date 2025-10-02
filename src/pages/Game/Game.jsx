import { Board, GameInfoBox, WinScreen } from "@akkelw/5irad-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../../providers/ApiProvider";
import { useBoard } from "@akkelw/5irad-board-ctx";
import styles from './Game.module.css';
import { useConnection } from "../../providers/ConnectionProvider";

const Game = () => {
    const { tiles, validateBoard, setTiles, round, isYourTurn, showEndDialog, setShowEndDialog, isWinner, setCurrentGameId } = useBoard();
    const { connect, disconnect } = useConnection();
    const { getTiles } = useApi();
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!params.gameId) {
            disconnect();
            navigate("/");
            return;
        }

        const checkValidate = async () => {
            const result = await validateBoard(params.gameId);
            if (!result) {
                disconnect();
                navigate("/");
                return;
            }

            setLoading(false);
        }

        checkValidate();
    }, [navigate, validateBoard, params]);

    useEffect(() => {
        if (!loading) {
            const fetchTiles = async () => {
                const result = await getTiles(params.gameId);
                connect();
                setTiles(result);
            }

            fetchTiles();
        }
    }, [loading]);

    //not working
    const handleClose = () => {
        setShowEndDialog(false);
        console.log("Click!")
    }

    return (
        loading
            ? <>Loading...</>
            : <div className={styles.GameContentContainer}>
                {showEndDialog && <WinScreen message={isWinner ? "You won" : "You lost"} handleClose={handleClose} />}
                <div className={styles.BoardContainer}>
                    <Board tiles={tiles} className={styles.Board} />
                </div>
                <GameInfoBox isYourTurn={isYourTurn} round={round} />
            </div>
    );
}
export default Game