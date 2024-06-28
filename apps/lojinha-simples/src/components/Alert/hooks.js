import { setAlert } from "../../store/alertSlice";
import { useRef } from "react";
export function useControlVisibilityAlert(dispatchParam) {
    const timeoutRef = useRef(null);
    const controlVisibilityAlert = (message, severity) => {
        if (timeoutRef.current !== null)
            clearTimeout(timeoutRef.current);
        dispatchParam(setAlert({
            message: message,
            severity: severity,
            show: true,
        }));
        timeoutRef.current = setTimeout(() => {
            dispatchParam(setAlert({ message: "", severity: "error", show: false }));
        }, 1500);
    };
    return controlVisibilityAlert;
}
