import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/user';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice';

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await loginUser(values);
            // Dispatch to Redux store
            dispatch(login(res.data));

            messageApi.open({
                type: 'success',
                content: 'Logged in successfully',
            });

            navigate('/');
        } catch (error) {
            console.error(error);
            messageApi.open({
                type: 'error',
                content: 'Login failed',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 w-full max-w-md">
                <span>{contextHolder}</span>
                <h2 style={{ marginBottom: '2rem' }} className="text-4xl font-semibold text-center">Login</h2>

                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item className='mt-10' name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input type="email" placeholder="Enter your email" className="py-2" />
                    </Form.Item>

                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder="Enter your password" className="py-2" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                            Login
                        </Button>
                    </Form.Item>

                    <p className='text-center text-lg'>Not a user? <Link to="/register">Register</Link></p>
                </Form>
            </div>
        </div>
    );
};

export default Login;
