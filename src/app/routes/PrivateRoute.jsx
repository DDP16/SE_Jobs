import { Navigate } from "react-router-dom";
import { TOKEN } from "../../settings/localVar";

export default function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem(TOKEN) !== null;

    if (isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }
    return <>{children}</>;
}