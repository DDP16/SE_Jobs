import { Navigate } from "react-router-dom";
import { AUTHENTICATED } from "../../settings/localVar";

export default function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem(AUTHENTICATED);

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }
    return <>{children}</>;
}