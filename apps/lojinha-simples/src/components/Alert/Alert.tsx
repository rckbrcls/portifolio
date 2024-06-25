import { Alert } from "@mui/material";
import { IAlertControl, alertState } from "../../store/alertSlice";
import { useAppSelector } from "../../hooks";

export type SeverityType = "error" | "info" | "success" | "warning";

export default function AlertComponent() {
  const alert: IAlertControl = useAppSelector(alertState);

  return (
    <>
      {alert.show && (
        <Alert
          sx={{ position: "fixed", zIndex: 10, right: 20, bottom: 20 }}
          variant="filled"
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      )}
    </>
  );
}
