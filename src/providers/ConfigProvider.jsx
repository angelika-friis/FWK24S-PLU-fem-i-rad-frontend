import { createContext } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => (
    <ConfigContext.Provider value={{}}>
        {children}
    </ConfigContext.Provider>
);
