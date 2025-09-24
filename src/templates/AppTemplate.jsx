import { Outlet } from "react-router-dom";
import styles from "./AppTemplate.module.css";
import { Menu, Footer } from "5irad-components";

const AppTemplate = () => {
    return (
        <div className={styles.appTemplate}>
            <Menu />
            
            <div className={styles.appWrapper}>
                <Outlet />
            </div>
            
            <Footer />
        </div>
    );
}

export default AppTemplate;