import { useLocation, Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserProvider';

export default function AdminRoute({ children }) {
    const { user } = useUser();
    const location = useLocation();

    if (user === undefined) {
        return null;
    }
    else if (!user.is_superuser) {
        const url = location.pathname + location.search + location.hash;
        return <Navigate to="/" state={{next: url}} />
    }
    else if (user.is_superuser) {
        return children;
    }
    else {
        const url = location.pathname + location.search + location.hash;
        return <Navigate to="/login" state={{next: url}} />
    }
}