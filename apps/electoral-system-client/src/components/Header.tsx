import { Component, createSignal } from "solid-js";

export const Header = ({ atualizaListas }: { atualizaListas: Function }) => {
  const [deveriaAlimentar, setDeveriaAlimentar] = createSignal<boolean>(false);

  async function limparBanco(): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/limpar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir dados");
      }

      setDeveriaAlimentar(true);
      atualizaListas();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }
  async function alimentarBanco(): Promise<void> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/alimentar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao alimentar dados");
      }

      setDeveriaAlimentar(false);
      atualizaListas();
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }

  return (
    <div class="navbar bg-base-200 p-4">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">electoral-system</a>
      </div>
      <div class="flex-none gap-2">
        <button
          class="btn btn-error text-red-800"
          onClick={() => limparBanco()}
        >
          Limpar banco
        </button>
        <button
          disabled={!deveriaAlimentar()}
          class="btn btn-success text-green-800"
          onClick={() => alimentarBanco()}
        >
          Alimentar banco
        </button>
      </div>
    </div>
  );
};
