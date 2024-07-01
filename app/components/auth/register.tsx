// pages/register.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('/api/register', { username, email, password });
            if (response.status === 201) {
                toast.success('Registration successful!');
                router.push('/login'); // Redirect to login page
            }
        } catch (error) {
            toast.error('Registration failed!');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <Card className="p-10 max-w-xs w-full">
                <Typography variant="h4" className="text-center mb-4">Register</Typography>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            crossOrigin=""
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            crossOrigin=""
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            crossOrigin=""
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="password"
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            crossOrigin=""
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-3'>

                        <Button type="submit" color="blue" fullWidth>Register</Button>
                        <Button color="blue" variant='outlined' fullWidth onClick={() => router.push("/")}> Cancel</Button>
                    </div>
                </form>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default Register;
