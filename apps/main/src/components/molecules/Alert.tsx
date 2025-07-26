"use client";

import React, { useEffect, useState } from "react";
import { Text } from "../atoms/Text";

const Alert = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alert = sessionStorage.getItem("alert");
    setShowAlert(!alert);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("alert", "alert");
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="glass-dark fixed bottom-4 right-1/2 z-50 flex w-11/12 translate-x-1/2 transform flex-col items-center justify-between gap-4 rounded-xl p-4 text-start transition duration-700 md:flex-row">
          <Text>
            This portfolio is a work in progress, but rest assured, one day it
            will be a polished masterpiece! 😉
          </Text>
          <button
            className="glass-dark w-full rounded-full px-4 py-2 transition duration-500 hover:scale-105 hover:bg-zinc-800 active:scale-95 active:bg-zinc-900 md:w-min"
            onClick={handleClose}
          >
            <Text>Close</Text>
          </button>
        </div>
      )}
    </>
  );
};

export default Alert;
