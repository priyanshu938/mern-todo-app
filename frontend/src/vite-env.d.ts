/// <reference types="vite/client" />

type MuiStandardColors =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
interface ITodo {
  _id?: string;
  title: string;
  category: string;
  categoryChipColor: MuiStandardColors;
  isCompleted: boolean;
}

interface IError {
  status: boolean;
  message: string;
}
