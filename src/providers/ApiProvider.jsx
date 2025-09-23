import { createContext, useContext } from "react";

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const getTiles = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/gomoku/tiles`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if(res.ok && res.status == 200) {
                const data = await res.json();

                const tiles = data.tiles;

                return tiles;
            } else {
                throw new Error("Failed to create game!", res.status);
            }
        } catch(error) {
            throw new Error("Error could not getTiles in ApiProvider", error);
        }
    }

    const createGame = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/gomoku/create_game`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });

            if(res.ok && res.status == 200) {
                const data = await res.json();

                return data.gameId;
            } else {
                throw new Error("Failed to create game!", res.status);
            }
        } catch(error) {
            throw new Error("Error could not createGame in ApiProvider", error);
        }
    }

    // todo: require Authorization header in backend
    const fillTile = async (gameId, row, column, token) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/gomoku/add_token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gameId: gameId,
                    row: row,
                    column: column,
                    token: token
                })
            });

            if(res.ok && res.status == 200) {
                const decoded = await res.json();
                const data = decoded.data;
                const tiles = data.tiles;
                const winner = data.winner;

                return {
                    tiles, 
                    winner
                };
            } else {
                throw new Error("Failed to fill tile!", res.status);
            }
        } catch(error) {
            throw new Error("Error could not fillTile in ApiProvider", error);
        }
    }

    const getGame = async (gameId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/gomoku/get_game?gameId=${gameId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if(res.ok && res.status == 200) {
                const data = await res.json();

                return data.data;
            } else {
                throw new Error("Failed to get game!", res.message);
            }
        } catch(error) {
            throw new Error("Error could not getGame in ApiProvider", error);
        }
    } 

    return (
        <ApiContext.Provider value={{ createGame, fillTile, getTiles, getGame }}>
            {children}
        </ApiContext.Provider>
    );
}

export default ApiProvider;

export const useApi = () => {
    const ctx = useContext(ApiContext);
    if(!ctx) throw new Error("useApi must be used within ApiProvider!");
    return ctx;
}