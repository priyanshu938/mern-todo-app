import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { closeNotification } from "../redux/notificationSlice";
import { SyntheticEvent, forwardRef } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IProps {
  severity: "success" | "error" | "warning" | "info";
  message: string;
  open: boolean;
}

export default function Notification({ severity, message, open }: IProps) {
  const dispatch = useDispatch();
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    console.log(event) 
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeNotification());
  };

  return (
    <Stack>
      <Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
