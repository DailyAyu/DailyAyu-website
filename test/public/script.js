document.addEventListener("DOMContentLoaded", () => {
  const appIcon = document.getElementById("app-icon");
  const hiddenMenu = document.getElementById("hidden-menu");
  const pluginsContainer = document.getElementById("plugins-link-conteiner");

  // Abrir/fechar menu
  appIcon.addEventListener("click", () => {
    hiddenMenu.classList.toggle("active");
  });

// Função para carregar plugins dinamicamente
async function carregarPlugin(pluginPath) {
  try {
    // Carrega o código do plugin como um módulo
    const pluginModule = await import(pluginPath);

    // Verifica se o plugin tem a função `init`
    if (typeof pluginModule.init === 'function') {
      // Fornece uma API segura para o plugin interagir com o site
      const api = {
        addContent: (content) => {
          const contentDiv = document.getElementById("content");
          contentDiv.innerHTML += content;
        },
        log: (message) => console.log(`[PLUGIN]: ${message}`)
      };

      // Inicializa o plugin com a API
      pluginModule.init(api);
    } else {
      console.error(`O plugin ${pluginPath} não possui uma função init.`);
    }
  } catch (error) {
    console.error(`Erro ao carregar o plugin ${pluginPath}:`, error);
  }
}

// Carrega todos os plugins
function carregarPlugins() {
  const plugins = [
        './plugins/plugin1.js', // Caminho para os plugins
        './plugins/plugin2.js'
    ];

  plugins.forEach(pluginPath => carregarPlugin(pluginPath));
}

// Chama a função para carregar plugins ao inicializar o site
carregarPlugins();

  // Adicionar listener para recarregar plugins manualmente
  document.getElementById("reload-plugins-btn").addEventListener("click", () => {
    fetch("/reload-plugins", { method: "POST" })
      .then(() => loadPlugins())
      .catch((err) => console.error("Erro ao recarregar plugins:", err));
  });
});