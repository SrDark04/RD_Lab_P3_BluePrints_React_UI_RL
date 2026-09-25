import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');

    if (token === null || token === undefined || token === '') {
        return <Navigate to="/login" replace />;
    }

    return children;
}