document.addEventListener("DOMContentLoaded", () => {
  const appIcon = document.getElementById("app-icon");
  const hiddenMenu = document.getElementById("hidden-menu");
  const pluginsContainer = document.getElementById("plugins-link-conteiner");

  // Abrir/fechar menu
  appIcon.addEventListener("click", () => {
    hiddenMenu.classList.toggle("active");
  });

  // Função para carregar plugins dinamicamente
  async function carregarPlugins() {
    try {
      // Faz a requisição para listar os plugins
      const response = await fetch("/plugins-list");
      const plugins = await response.json();

      // Carrega cada plugin da pasta
      for (const pluginFile of plugins) {
        const pluginPath = `./plugins/${pluginFile}`;
        const pluginModule = await import(pluginPath);

        if (typeof pluginModule.init === "function") {
          const api = {
            addContent: (content) => {
              const contentDiv = document.getElementById("content");
              contentDiv.innerHTML += content;
            },
            log: (message) => console.log(`[PLUGIN]: ${message}`),
          };

          pluginModule.init(api);
        } else {
          console.error(`O plugin ${pluginFile} não possui uma função init.`);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar plugins:", error);
    }
  }

  // Chama a função para carregar plugins ao inicializar o site
  carregarPlugins();

  // Adicionar listener para recarregar plugins manualmente
  document.getElementById("reload-plugins-btn").addEventListener("click", () => {
    fetch("/reload-plugins", { method: "POST" })
      .then(() => carregarPlugins()) // Recarregar plugins quando o botão for pressionado
      .catch((err) => console.error("Erro ao recarregar plugins:", err));
  });
});