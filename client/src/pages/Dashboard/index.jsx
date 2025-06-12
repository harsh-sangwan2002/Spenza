import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>

            <div className="flex items-center gap-5">
                <Link to="/webhooks">
                    <Button className="text-2xl" type="primary">
                        Webhooks
                    </Button>
                </Link>

                <Button
                    className="text-2xl"
                    type="primary"
                    danger
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
