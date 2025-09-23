import { createContext, useEffect, useState } from "react";
import { useApi } from "./ApiProvider";

export const BoardContext = createContext();

const BoardProvider = ({ children }) => {
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

    const { fillTile, createGame, getGame, getTiles } = useApi();

    /* Varför kallar det här på ALLA api metoder???
    useEffect(() => {
        const fetchTiles = async () => {
            const result = await getTiles();
            setTiles(result);
        }

        fetchTiles();
    }, []);
    */

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
        const gameId = createGame();
        return gameId;
    }

    const validateBoard = async (gameId) => {
        try {
            const game = await getGame(gameId);

            return Object.hasOwn(game, "gameId");
        } catch(error) {
            return false;
        }
    }

    return (
        <BoardContext.Provider value={{ setTile, getTile, tiles, createBoard, validateBoard }}>
            {children}
        </BoardContext.Provider>
    );
}

export default BoardProvider;