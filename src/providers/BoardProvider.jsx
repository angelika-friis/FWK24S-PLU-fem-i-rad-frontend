import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useApi } from "./ApiProvider";
import { AuthContext } from "./AuthProvider";
import { BoardCtx } from "@akkelw/5irad-board-ctx";

const BoardProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { addPlayer } = useApi();
    const [currentGameId, setCurrentGameId] = useState(null);
    const gameIdRef = useRef(null);
    const userRef = useRef(user);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    const [tiles, setTiles] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    
    const [round, setRound] = useState(0);
    const [isYourTurn, setIsYourTurn] = useState(true);
    const [gameover, setGameover] = useState(false);
    const [isWinner, setIsWinner] = useState(null);
    const [showEndDialog, setShowEndDialog] = useState(false);

    const { fillTile, createGame, getGame } = useApi();

    const setTile = async (gameId, row, column) => {
        if(getTile(row, column) != null || gameover) return;

        const game = await getGame(gameId);

        if(!game) return false;

        const players = game.players;

        if(!players || (players && players.length < 1)) return false;

        if(!players.includes(user.id)) return false;

        const token = players[0] == user.id ? 1 : 2;

        const updatedTiles = await fillTile(gameId, row, column, token);

        setTiles(updatedTiles.tiles);

        if(updatedTiles.winner != null) {
            console.log("We have a winner! ", token);
        }
    }

    const getTile = (row, column) => {
        const entry = tiles.find(item => {
            if(item[row]) {
                return item[row][column];
            }
        });

        return entry ? entry[row][column] : null;
    }

    const createBoard = async () => {
        setTiles([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);

        const gameId = await createGame();

        const data = await addPlayer(gameId);

        if(!data.success) {
            console.error(data.message);
            return;
        }

        return data.gameId;
    }

    const joinBoard = async (gameId) => {
        const data = await addPlayer(gameId);
        
        if(!data.success) {
            console.error(data.message);
            return;
        }

        console.log(data.message)

        return true;
    }

    const validateBoard = async (gameId) => {
        console.log("validating...", gameId)
        try {
            const game = await getGame(gameId);

            if(!game) return false;

            const players = game.players;
            
            setRound(game.round);
            setIsYourTurn(game.isYourTurn);
            setIsWinner(game.isWinner);

            if(game.winner) {
                setGameover(true);
                setShowEndDialog(true);
            };

            if(!players || (players && players.length < 1)) return false;

            if(!players.includes(user.id)) return false;

            gameIdRef.current = gameId;

            return true;
        } catch(error) {
            return false;
        }
    }

    const onEventDropToken = (payload) => {
        if(gameIdRef.current != payload.gameId || payload.playerId == userRef.current.id) return;
        
        const tiles = payload.tiles;
        const winner = payload.winner;

        setTiles(tiles);

        if(winner != null) {
            console.log("We have a winner! ", token);
        }
    }

    return (
        <BoardCtx.Provider value={{ setTile, getTile, tiles, createBoard, validateBoard, setTiles, joinBoard, round, isYourTurn, isWinner, showEndDialog, setShowEndDialog, onEventDropToken, setCurrentGameId }}>
            {children}
        </BoardCtx.Provider>
    );
}

export default BoardProvider;