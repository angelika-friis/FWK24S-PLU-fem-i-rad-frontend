import { Outlet } from "react-router-dom";
import styles from "./AppTemplate.module.css";
import { Menu, Footer } from "5irad-components";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AppTemplate = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles.appTemplate}>
            <Menu user={user} />
            
            <div className={styles.appWrapper}>
                <Outlet />
            </div>
            
            <Footer />
        </div>
    );
}

export default AppTemplate;