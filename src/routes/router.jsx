import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const Placeholder = () => <h1>Placeholder</h1>;

export function createRouter() {
    return createBrowserRouter([{ path: "/", element: <Placeholder /> }]);
}

export function AppRouter() {
    const router = React.useMemo(() => createRouter(), []);
    return <RouterProvider router={router} />;
}
