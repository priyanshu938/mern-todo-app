import { Container } from "@mui/material";
import Todo from "./components/Todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

function App() {
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
