import { Outlet } from "react-router-dom";
import styles from "./AppTemplate.module.css";
import { Menu, Footer } from "@akkelw/5irad-components";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useTheme } from "../foundation/StylesProvider";

const AppTemplate = () => {
    const { user } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.appTemplate}>
            <Menu user={user} toggleTheme={toggleTheme} theme={theme} />
            
            <div className={styles.appWrapper}>
                <Outlet />
            </div>
            
            <Footer />
        </div>
    );
}

export default AppTemplate;