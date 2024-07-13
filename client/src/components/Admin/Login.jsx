import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/adminSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 's';
    if (email === adminEmail && password === adminPassword) {
      dispatch(login());
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="mt-28">
        <div className='mb-12'>
        <Typography component="h1" variant="h5" align="center" >
          Admin Login
        </Typography>
        </div>
      
        <form className="mt-3" onSubmit={handleLogin}>
          <TextField
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className="mt-3"
          >
            Login
          </Button>
          {error && <Typography variant="body2" color="error" className="mt-2">{error}</Typography>}
        </form>
      </div>
    </Container>
  );
};

export default Login;
