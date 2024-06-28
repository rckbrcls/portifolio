import dynamic from "next/dynamic";
import React from "react";

const LojinhaSimples = dynamic(() => import("lojinha_simples/App"), {
  ssr: false,
});

const LojinhaSimplesPage = () => {
  return (
    <div>
      <LojinhaSimples />
    </div>
  );
};

export default LojinhaSimplesPage;
