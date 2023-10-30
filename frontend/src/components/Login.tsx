import { Button, Paper, Stack } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import { Lock } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callNotification } from "../redux/notificationSlice";
import { RootState } from "../redux/store";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../App";
import { login, logout } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${BACKEND_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(
        callNotification({
          open: true,
          message: data.message,
          severity: data.success ? "success" : "error",
        })
      );
      dispatch(login());
      setEmail("");
      setPassword("");
    } catch (error) {
      const err = error as AxiosError;
      const data: IError = err.response?.data as IError;
      dispatch(
        callNotification({
          open: true,
          message: data.message,
          severity: "error",
        })
      );
      dispatch(logout());
    }
  };
  if (isAuthenticated) return <Navigate to="/todo" />;

  return (
    <>
      <Paper elevation={15} sx={{ width: "20rem", padding: "2rem" }}>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <Typography variant="h4" align={"center"}>
              Login
            </Typography>
            <TextField
              id="email"
              label="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              InputProps={{
                type: "email",
                required: true,
                placeholder: "Enter email...",

                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              InputProps={{
                placeholder: "Enter password...",
                type: "password",
                required: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button
              sx={{
                color: "#e8eaf6",
                backgroundColor: "#1a237e",
                textDecoration: "none",
                border: "1px solid",
                "&:hover": {
                  color: "#1a237e",
                  backgroundColor: "#e8eaf6",
                },
              }}
              type="submit"
            >
              Login
            </Button>
            <Typography variant="body1">
              Don't have an account?{" "}
              <Link to="/register" className="registerLoginLink">
                {" "}
                Register
              </Link>
            </Typography>
          </Stack>
        </form>{" "}
      </Paper>
    </>
  );
};

export default Login;
