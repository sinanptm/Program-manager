import { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useLoginMutation } from "../../slices/authApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const res = await auth({ email, password }).unwrap();
      dispatch(setCredentials({ token: res.token }));
      navigate("/admin/");
    } catch (err) {
      console.error("Failed to login: ", err);
      setError("Invalid email or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: "28px" }}>
        <div style={{ marginBottom: "12px" }}>
          <Typography component="h1" variant="h5" align="center">
            Admin Login
          </Typography>
        </div>

        <form onSubmit={handleLogin}>
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
            style={{ marginTop: "16px" }}
          >
            Login
          </Button>
          {error && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "16px" }}
            >
              {error}
            </Typography>
          )}
        </form>
      </div>
    </Container>
  );
};

export default Login;
