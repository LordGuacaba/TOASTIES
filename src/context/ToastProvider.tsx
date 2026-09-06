import { Toast } from "@/utilities/types";
import { useState } from "react";
import { ToastContext } from "./ToastContext";

const ToastProvider = ({ children } : any) => {
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