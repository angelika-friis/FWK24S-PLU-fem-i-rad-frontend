import { Route, Routes } from "react-router-dom";
import AppTemplate from "../templates/AppTemplate";
import Login from "../pages/Login";
import Lobby from "../pages/Lobby";
import Register from "../pages/Register";
import Game from "../pages/Game";

const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<AppTemplate />}>
                <Route index element={<Login />} />
            </Route>
            <Route path="/register" element={<AppTemplate />}>
                <Route index element={<Register />} />
            </Route>
            <Route path="/lobby" element={<AppTemplate />}>
                <Route index element={<Lobby />} />
            </Route>
            <Route path="/game/:gameId" element={<AppTemplate />}>
                <Route index element={<Game />} />
            </Route>
        </Routes>
    );
};

export default Router;