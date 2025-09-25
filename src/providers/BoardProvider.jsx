import { createContext, useContext, useState } from "react";
import { useApi } from "./ApiProvider";
import { AuthContext } from "./AuthProvider";

export const BoardContext = createContext();

const BoardProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { addPlayer } = useApi();

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
    
    const [gameover, setGameover] = useState(false);

    const { fillTile, createGame, getGame } = useApi();

    const setTile = async (gameId, row, column, token) => {
        if(getTile(row, column) != null || gameover) return;

        const updatedTiles = await fillTile(gameId, row, column, token);

        setTiles(updatedTiles.tiles);

        if(updatedTiles.winner != null) {
            console.log("We have a winner! ", token);
            setGameover(true);
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

        await addPlayer(gameId);

        return gameId;
    }

    const validateBoard = async (gameId) => {
        try {
            const game = await getGame(gameId);

            if(!game) return false;

            const players = game.players;

            if(!players || (players && players.length < 1)) return false;

            if(!players.includes(user.id)) return false;

            return true;
        } catch(error) {
            return false;
        }
    }

    return (
        <BoardContext.Provider value={{ setTile, getTile, tiles, createBoard, validateBoard, setTiles }}>
            {children}
        </BoardContext.Provider>
    );
}

export default BoardProvider;