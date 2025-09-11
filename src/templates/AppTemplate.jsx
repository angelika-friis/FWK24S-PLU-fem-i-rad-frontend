import styles from "./AppTemplate.module.css";

const AppTemplate = ({ children }) => {
    return (
        <div styles={styles.appTemplate}>
            {children}
        </div>
    );
}

export default AppTemplate;