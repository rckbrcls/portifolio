import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert } from "@mui/material";
import { alertState } from "../../store/alertSlice";
import { useAppSelector } from "../../hooks";
export default function AlertComponent() {
    const alert = useAppSelector(alertState);
    return (_jsx(_Fragment, { children: alert.show && (_jsx(Alert, { sx: { position: "fixed", zIndex: 10, right: 20, bottom: 20 }, variant: "filled", severity: alert.severity, children: alert.message })) }));
}
