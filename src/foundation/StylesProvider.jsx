import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import "../styles/StylesProvider.css";

const ThemeContext = createContext({
    theme: "light",
    setTheme: () => {},
    toggleTheme: () => {},
});

export const StylesProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            toggleTheme: () => {
                const next = theme === "dark" ? "light" : "dark";
                const root = document.documentElement;

                root.classList.add("theme-animating");

                setTheme(next);

                setTimeout(() => root.classList.remove("theme-animating"), 300);
            },
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);