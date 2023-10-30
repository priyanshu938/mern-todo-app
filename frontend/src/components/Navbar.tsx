import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Todo App
          </Typography>
          <Stack direction={"row"} gap={2}>
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
                Logout
              </Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
