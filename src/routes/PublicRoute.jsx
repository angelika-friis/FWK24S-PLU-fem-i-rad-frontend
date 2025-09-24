import { Navigate, Outlet } from "react-router";

const PublicRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Navigate to="/lobby" replace /> : <Outlet />;
}
 
export default PublicRoute;