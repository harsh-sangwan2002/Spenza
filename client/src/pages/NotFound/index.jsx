import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-2xl mb-4">Oops! Page not found.</p>
            <Link to="/" className="text-blue-600 hover:underline text-lg">
                Go back to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
