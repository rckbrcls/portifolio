// hooks/useScrollRestoration.ts

import { useEffect } from "react";
import { useRouter } from "next/router";

const useScrollRestoration = () => {
  const router = useRouter();
  const scrollPositions = new Map<string, number>();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    window.history.scrollRestoration = "manual"; // Desabilita o comportamento padrão de restauração

    const saveScrollPosition = () => {
      // Salva a posição do scroll da página atual
      scrollPositions.set(router.asPath, window.scrollY);
    };

    const restoreScrollPosition = (url: string) => {
      // Restaura a posição do scroll para a página atual, se existir
      const scrollY = scrollPositions.get(url) || 0;
      window.scrollTo(0, scrollY);
    };

    const onPopState = () => {
      // Evento acionado ao clicar no botão "voltar" do navegador
      restoreScrollPosition(router.asPath);
    };

    // Salva a posição do scroll antes de mudar de rota
    router.events.on("routeChangeStart", saveScrollPosition);

    // Restaura a posição do scroll após a mudança de rota
    router.events.on("routeChangeComplete", restoreScrollPosition);

    // Listener para o evento de navegação "popstate" (botão back)
    window.addEventListener("popstate", onPopState);

    return () => {
      // Cleanup dos eventos quando o componente desmonta
      router.events.off("routeChangeStart", saveScrollPosition);
      router.events.off("routeChangeComplete", restoreScrollPosition);
      window.removeEventListener("popstate", onPopState);
    };
  }, [router]);

  return null;
};

export default useScrollRestoration;
