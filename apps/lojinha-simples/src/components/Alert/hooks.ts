import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { IAlertControl, setAlert } from "../../store/alertSlice";
import { SeverityType } from "./Alert";
import { ICart } from "../../store/cartSlice";
import { useRef } from "react";

type DispatchType = ThunkDispatch<
  {
    cart: ICart;
    alert: IAlertControl;
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction>;

export function useControlVisibilityAlert(dispatchParam: DispatchType) {
  const timeoutRef = useRef<number | null>(null);

  const controlVisibilityAlert = (message: string, severity: SeverityType) => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    dispatchParam(
      setAlert({
        message: message,
        severity: severity,
        show: true,
      })
    );

    timeoutRef.current = setTimeout(() => {
      dispatchParam(setAlert({ message: "", severity: "error", show: false }));
    }, 1500);
  };

  return controlVisibilityAlert;
}
