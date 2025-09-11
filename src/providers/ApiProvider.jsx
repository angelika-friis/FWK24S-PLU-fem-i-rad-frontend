import { createContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => (
    <ApiContext.Provider value={{}}>
        {children}
    </ApiContext.Provider>
);
