import { Outlet } from "react-router-dom";
import styles from "./AppTemplate.module.css";

const AppTemplate = () => {
    return (
        <div className={styles.appTemplate}>
            <Outlet />
        </div>
    );
}

export default AppTemplate;