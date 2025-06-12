import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/user';

const Register = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await registerUser(values);
            messageApi.open({
                type: 'success',
                content: 'Registered successfully',
            });
            navigate('/login');
        } catch (error) {
            console.error(error);
            messageApi.open({
                type: 'success',
                content: 'Registration failed',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 w-full max-w-md">
                {contextHolder}
                <h2 style={{ marginBottom: '3rem' }} className="text-4xl font-semibold text-center mb-6">Register</h2>
                <Form name="register" onFinish={onFinish} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                        <Input placeholder="Enter your name" className="py-2" />
                    </Form.Item>

                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input type="email" placeholder="Enter your email" className="py-2" />
                    </Form.Item>

                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder="Enter your password" className="py-2" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                            Register
                        </Button>
                    </Form.Item>
                    <p className='text-center text-lg'>Already a user? <Link to="/login">Login</Link></p>
                </Form>
            </div>
        </div>
    );
};

export default Register;
