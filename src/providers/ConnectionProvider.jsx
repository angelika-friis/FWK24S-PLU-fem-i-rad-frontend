import { createContext, useContext, useEffect } from "react";
import { socket } from "../socket";
import { useBoard } from "@akkelw/5irad-board-ctx";

export const ConnectionContext = createContext();

const ConnectionProvider = ({ children }) => {
    const { onEventDropToken } = useBoard();

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("board:dropComplete", onDropToken);
        console.log("ConnectionContext loaded.")
    }, []);

    const onConnect = () => {
        console.log("connected")
    }

    const onDisconnect = () => {
        console.log("disconnected")
    }

    const onDropToken = (payload) => {
        
        onEventDropToken(payload);
    }
    
    const connect = () => {
        if(socket.connected) return;
        socket.connect();
    }

    const disconnect = () => {
        if(!socket.connected) return;
        socket.disconnect();
    }

    return (
        <ConnectionContext.Provider value={{ connect, disconnect }}>
            {children}
        </ConnectionContext.Provider>
    );
}

export default ConnectionProvider;

export const useConnection = () => {
    const ctx = useContext(ConnectionContext);
    if (!ctx) throw new Error("useConnection must be used within ConnectionProvider!");
    return ctx;
}