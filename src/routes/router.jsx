import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppTemplate from "../templates/AppTemplate";
import Login from "../pages/Login";

const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<AppTemplate />}>
                <Route index element={<Login />} />
            </Route>
        </Routes>
    );
};

export default Router;