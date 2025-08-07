import React, { useState } from 'react';
import taskService from '../services/taskService';

function AuthForm({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            if (isLogin) {
                await taskService.login({ username, password });
                onLoginSuccess();
            } else {
                await taskService.register({ username, password, email });
                alert('Registrasi berhasil! Silakan login.');
                setIsLogin(true); // Switch to login after successful registration
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Terjadi kesalahan.');
            console.error('Auth error:', err);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{isLogin ? 'Login' : 'Daftar'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-200">
                    {isLogin ? 'Login' : 'Daftar'}
                </button>
                <p className="text-center text-gray-600 text-sm mt-4">
                    {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
                    <button
                        type="button"
                        className="font-bold text-blue-600 hover:text-blue-800 ml-1"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Daftar sekarang' : 'Login sekarang'}
                    </button>
                </p>
            </form>
        </div>
    );
}

export default AuthForm;