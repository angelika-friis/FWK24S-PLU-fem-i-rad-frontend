import { createContext, useContext } from "react";

export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const createGame = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/gomoku/create_game`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            });

            if(res.ok && res.status == 200) {
                const data = await res.json();

                console.log(data.message);
            } else {
                throw new Error("Failed to create game!", res.status);
            }
        } catch(error) {
            throw new Error("Error could not createGame in ApiProvider", error);
        }
    }

    // todo: require Authorization header in backend
    const fillTile = async (gameId, row, column) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/gomoku/add_token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gameId: gameId,
                    row: row,
                    column: column
                })
            });

            if(res.ok && res.status == 200) {
                const data = await res.json();

                const tiles = data.tiles;

                console.log(data.tiles);
            } else {
                throw new Error("Failed to fill tile!", res.status);
            }
        } catch(error) {
            throw new Error("Error could not fillTile in ApiProvider", error);
        }
    }

    return (
        <ApiContext.Provider value={{ createGame, fillTile }}>
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