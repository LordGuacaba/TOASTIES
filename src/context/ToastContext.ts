import { Toast } from "@/utilities/types";
import { createContext } from "react";

export type ToastContextType = {
  toast: Toast | null;
  setToast: (toast: Toast | null) => void;
};

export const ToastContext = createContext<ToastContextType>({
  toast: null,
  setToast: () => {},
});
