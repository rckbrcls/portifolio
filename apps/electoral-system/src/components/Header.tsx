import { Component, createSignal } from "solid-js";

// Prefer build-time __VITE_API_URL__ (inlined via vite.config.define). Fallback
// to localhost:5000 to preserve original behavior when the env var isn't set.
declare const __VITE_API_URL__: string | undefined;
const ADMIN_DEFAULT = "https://electoral-api.erickbarcelos.com";
const ADMIN_API_URL =
  (typeof __VITE_API_URL__ !== "undefined" && __VITE_API_URL__) ||
  ADMIN_DEFAULT;

export const Header = ({ atualizaListas }: { atualizaListas: Function }) => {
  const [deveriaAlimentar, setDeveriaAlimentar] = createSignal<boolean>(true);

  async function limparBanco(): Promise<void> {
    try {
      const response = await fetch(`${ADMIN_API_URL}/limpar`, {
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
      console.error("Erro:", (error as Error).message);
    }
  }
  async function alimentarBanco(): Promise<void> {
    try {
      const response = await fetch(`${ADMIN_API_URL}/alimentar`, {
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
      console.error("Erro:", (error as Error).message);
    }
  }

  return (
    <div class="navbar bg-base-200 p-4">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">electoral-system</a>
      </div>
      <div class="flex-none gap-2">
        <button
          disabled={deveriaAlimentar()}
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
