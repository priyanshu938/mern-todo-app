import { Button, Paper, Stack } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import { Lock } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, email, password);
    setUsername("");
    setEmail("");
    setPassword("");
    // Add your login logic here
  };

  return (
    <>
      <Paper elevation={15} sx={{ width: "20rem", padding: "2rem" }}>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <Typography variant="h4" align={"center"}>
              Register
            </Typography>
            <TextField
              id="username"
              label="Username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              InputProps={{
                type: "text",
                required: true,
                placeholder: "Enter username...",
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
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
              Already have an account?
              <Link to="/" className="registerLoginLink">
                {" "}
                Login
              </Link>
            </Typography>
          </Stack>
        </form>{" "}
      </Paper>
    </>
  );
};

export default Register;
