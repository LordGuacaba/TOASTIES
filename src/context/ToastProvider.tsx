import { Toast } from "@/utilities/types";
import { useState } from "react";
import { ToastContext } from "./ToastContext";

interface ToastProviderProps {
    children: React.ReactNode
}

const ToastProvider = ({ children } : ToastProviderProps) => {
    const [toast, setToast] = useState<Toast | null>(null);
    const setToastContext = (t: Toast | null) => {
        setToast(t)
    }

    return <ToastContext.Provider value={{
        toast,
        setToast: setToastContext
    }}
    >{children}</ToastContext.Provider>
}

export default ToastProvider;