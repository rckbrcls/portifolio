// Script para adicionar nos microfrontends para comunicação com o host
(function () {
  "use strict";

  // Só executar se estiver dentro de iframe
  if (window.self === window.top) return;

  console.log("📡 Comunicação com host iniciada");

  // Função para notificar altura
  function notifyHeight() {
    const height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    window.parent.postMessage(
      {
        type: "RESIZE",
        height: Math.max(height, 400), // Altura mínima
      },
      "*"
    );
  }

  // Notificar quando carregado
  function notifyLoaded() {
    window.parent.postMessage(
      {
        type: "LOADED",
      },
      "*"
    );
  }

  // Observer para mudanças de altura
  const resizeObserver = new ResizeObserver(() => {
    notifyHeight();
  });

  // Observer para mudanças no DOM
  const mutationObserver = new MutationObserver(() => {
    notifyHeight();
  });

  // Inicializar quando DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    // Observar mudanças
    resizeObserver.observe(document.body);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Notificar altura inicial
    setTimeout(notifyHeight, 100);
    setTimeout(notifyHeight, 500);
    setTimeout(notifyHeight, 1000);

    // Notificar que carregou
    notifyLoaded();

    console.log("✅ Comunicação configurada");
  }

  // Notificar em mudanças de rota (SPA)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function () {
    originalPushState.apply(this, arguments);
    setTimeout(notifyHeight, 100);
  };

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    setTimeout(notifyHeight, 100);
  };

  window.addEventListener("popstate", () => {
    setTimeout(notifyHeight, 100);
  });
})();
