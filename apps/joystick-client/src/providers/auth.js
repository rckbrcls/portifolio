import React, { useState } from "react";

export const AuthContext = React.createContext({});
export const AuthProvider = (props) => {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <AuthContext.Provider value={{ carrinho, setCarrinho }}>
      {props.children}
    </AuthContext.Provider>
  );
};
