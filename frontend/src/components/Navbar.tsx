import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Notification from "../utils/Notification";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../App";
import { callNotification } from "../redux/notificationSlice";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const open = useSelector((state: RootState) => state.notification.open);
  const message = useSelector((state: RootState) => state.notification.message);
  const severity = useSelector(
    (state: RootState) => state.notification.severity
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/users/logout`, {
        withCredentials: true,
      });
      dispatch(
        callNotification({
          open: true,
          message: data.message,
          severity: data.success ? "success" : "error",
        })
      );
      dispatch(logout());
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
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Notification open={open} severity={severity} message={message} />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Todo App
          </Typography>
          <Stack direction={"row"} gap={2}>
            {!isAuthenticated ? (
              <>
                <Link to={"/"}>
                  <Button
                    sx={{
                      color: "#e8eaf6",
                      backgroundColor: "#1a237e",
                      textDecoration: "none",
                      "&:hover": {
                        backgroundColor: "#e8eaf6",
                        color: "#1a237e",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button
                    sx={{
                      color: "#e8eaf6",
                      backgroundColor: "#1a237e",
                      textDecoration: "none",
                      "&:hover": {
                        backgroundColor: "#e8eaf6",
                        color: "#1a237e",
                      },
                    }}
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Link to={"/"}>
                <Button
                  sx={{
                    color: "#e8eaf6",
                    backgroundColor: "#1a237e",
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "#e8eaf6",
                      color: "#1a237e",
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
