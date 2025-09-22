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

    const { fillTile, createGame, getTiles } = useApi();

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
        if(getTile(row, column) != null) return;

        const updatedTiles = await fillTile(gameId, row, column, token);

        setTiles(updatedTiles.tiles);

        if(updatedTiles.winner != null) {
            console.log("We have a winner! ", token)
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
        const gameId = createGame();
        return gameId;
    }

    return (
        <BoardContext.Provider value={{ setTile, getTile, tiles, createBoard }}>
            {children}
        </BoardContext.Provider>
    );
}

export default BoardProvider;