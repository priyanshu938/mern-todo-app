import { Container } from "@mui/material";
import Todo from "./components/Todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/authSlice";
//import { RootState } from "./redux/store";

export const BACKEND_URL = "https://todoapp-ifau.onrender.com/api/v1";

function App() {
  const dispatch = useDispatch();
  //const isAuthenticated = useSelector(
   // (state: RootState) => state.auth.isAuthenticated
 // );
  useEffect(() => {
    // isAuthenticated &&
    axios
      .get(`${BACKEND_URL}/users/me`, { withCredentials: true })
      .then(() => {
        dispatch(login());
      })
      .catch((err) => {
        dispatch(logout());
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90vw",
            marginBlock: "2rem",
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
