import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    return user ? <div>{children}</div> : <Navigate to="/login" replace />;
};

export default PrivateRoute;