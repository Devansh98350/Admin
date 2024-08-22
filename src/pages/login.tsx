
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { login } from '../redux/slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(credentials))
      .unwrap()
      .then(() => {
        router.push('/dashboard');
      })
      .catch((error) => setErrors(error));
  };

  return (
    <div className="login-container">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          error={errors.username}
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button type="submit" label="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
