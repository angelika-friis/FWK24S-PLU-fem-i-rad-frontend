import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AppTemplate from "../templates/AppTemplate";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Lobby from "../pages/Lobby";
import Register from "../pages/Register";
import Game from "../pages/Game/Game";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../providers/AuthProvider";

import About from "../pages/About";
import Contact from "../pages/Contact";

const Router = () => {
    const { user, authReady } = useContext(AuthContext);

    if (!authReady) {
        return (<>Loading...</>);
    }

    return (
        <Routes>
            <Route path="/login" element={<PublicRoute isAuthenticated={user != null} />}>
                <Route element={<AppTemplate />}>
                    <Route index element={<Login />} />
                </Route>
            </Route>
            <Route path="/register" element={<PublicRoute isAuthenticated={user != null} />}>
                <Route element={<AppTemplate />}>
                    <Route index element={<Register />} />
                </Route>
            </Route>
            <Route path="/about" element={<AppTemplate />}>
                <Route index element={<About />} />
            </Route>

            <Route path="/contact" element={<AppTemplate />}>
                <Route index element={<Contact />} />
            </Route>
            <Route path="/" element={<ProtectedRoute isAuthenticated={user != null} />}>
                <Route element={<AppTemplate />}>
                    <Route index element={<Lobby />} />
                </Route>
            </Route>
            <Route exact path="/game" element={<ProtectedRoute isAuthenticated={user != null} />}>
                <Route element={<AppTemplate />}>
                    <Route index element={<Game />} />
                </Route>
            </Route>
            <Route exact path="/game/:gameId" element={<ProtectedRoute isAuthenticated={user != null} />}>
                <Route element={<AppTemplate />}>
                    <Route index element={<Game />} />
                </Route>
            </Route>
            <Route path="/logout" element={<ProtectedRoute isAuthenticated={user != null} />}>
                <Route element={<AppTemplate />}>
                    <Route index element={<Logout />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;