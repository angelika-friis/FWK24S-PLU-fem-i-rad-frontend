import { Outlet } from "react-router-dom";
import styles from "./AppTemplate.module.css";
import { Header, Footer } from "5irad-components";

const AppTemplate = () => {
    return (
        <div className={styles.appTemplate}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default AppTemplate;