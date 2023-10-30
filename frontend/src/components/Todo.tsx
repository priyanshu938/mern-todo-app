import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  getMyTodos,
  updateTodo,
} from "../redux/todoSlice";
import { RootState } from "../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import Chip from "@mui/material/Chip";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { getRandomColor } from "../utils/getMuiColor";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../App";
import { callNotification } from "../redux/notificationSlice";
import { logout } from "../redux/authSlice";

const Todo = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isUpdateTodoClicked, setIsUpdateTodoClicked] =
    useState<boolean>(false);
  const [updateTodos, setUpdateTodos] = useState<
    Pick<ITodo, "id" | "title" | "category">
  >({ id: "", title: "", category: "" });

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const todo: ITodo = {
        id: Date.now() + "",
        title,
        category,
        categoryChipColor: getRandomColor(),
        isCompleted: false,
      };
      const { data } = await axios.post(`${BACKEND_URL}/task/new`, todo, {
        withCredentials: true,
      });
      dispatch(
        callNotification({
          open: true,
          message: data.message,
          severity: data.success ? "success" : "error",
        })
      );
      setTitle("");
      setCategory("");
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

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const handleCompleteTodo = (todo: ITodo) => {
    dispatch(updateTodo({ ...todo, isCompleted: !todo.isCompleted }));
  };
  const getTodos = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/task/my`, {
        withCredentials: true,
      });
      dispatch(getMyTodos({ todos: data.tasks }));
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
  useEffect(() => {
    getTodos();
  }, []);

  if (!isAuthenticated) return <Navigate to="/" />;
  return (
    <Box sx={{ width: "90%" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        <TextField
          label="Title"
          variant="standard"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          sx={{ width: "40%" }}
          required
        />
        <TextField
          label="Category"
          variant="standard"
          type="text"
          name="category"
          id="category"
          value={category}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCategory(e.target.value)
          }
          required
        />
        <Fab color="primary" aria-label="add" type="submit">
          <AddIcon />
        </Fab>
      </form>
      {todos.length === 0 && (
        <Typography variant="h5" mt={2} sx={{ textAlign: "center" }}>
          No todos found!
        </Typography>
      )}
      {todos?.map((todo, index) => {
        return (
          <Box key={todo.id} marginBlock={2}>
            <Paper elevation={16} sx={{ height: "4.5rem", padding: "1rem" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {isUpdateTodoClicked && updateTodos.id === todo.id ? (
                  <form
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                    onSubmit={(e: FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      dispatch(
                        updateTodo({
                          ...todo,
                          title: updateTodos.title,
                          category: updateTodos.category,
                        })
                      );
                      setUpdateTodos({ id: "", title: "", category: "" });
                      setIsUpdateTodoClicked(false);
                    }}
                  >
                    <TextField
                      id="update"
                      label="Update Title"
                      variant="standard"
                      value={updateTodos.title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateTodos((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      required
                    />
                    <TextField
                      id="update"
                      label="Update Category"
                      variant="standard"
                      value={updateTodos.category}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUpdateTodos((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      required
                    />
                    <Tooltip title="Save">
                      <IconButton
                        type="submit"
                        aria-label="delete"
                        color="info"
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                  </form>
                ) : (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: todo.isCompleted
                          ? "line-through"
                          : "none",
                        textDecorationColor: "#ff0303",
                      }}
                    >
                      {`${index + 1}. ${todo.title}`}
                    </Typography>
                  </Stack>
                )}

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Checkbox
                    defaultChecked={todo.isCompleted}
                    onChange={() => handleCompleteTodo(todo)}
                  />
                  <Chip label={todo.category} color={todo.categoryChipColor} />

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(todo.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setIsUpdateTodoClicked(true);
                        setUpdateTodos({
                          id: todo.id,
                          title: todo.title,
                          category: todo.category,
                        });
                      }}
                    >
                      <EditIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
};

export default Todo;
