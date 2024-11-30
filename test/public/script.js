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
    for (const plugin of plugins) {
      const pluginPath = `./plugins/${plugin.name}`;
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
        console.error(`O plugin ${plugin.name} não possui uma função init.`);
      }
    }
  } catch (error) {
    console.error("Erro ao carregar plugins:", error);
  }
}

  // Chama a função para carregar plugins ao inicializar o site
  carregarPlugins();

function loadPlugins() {
  pluginsContainer.innerHTML = ""; // Limpa a lista
  fetch("/plugins")
    .then((res) => res.json())
    .then((plugins) => {
      const ul = document.createElement("ul");
      plugins.forEach((plugin) => {
        const li = document.createElement("li");
        li.textContent = `${plugin.name}: ${plugin.description}`;
        ul.appendChild(li);
      });
      pluginsContainer.appendChild(ul);
    })
    .catch((err) => console.error("Erro ao carregar plugins:", err));
}

// Inicializar plugins
loadPlugins();

// Adicionar listener para recarregar plugins manualmente
document.getElementById("reload-plugins-btn").addEventListener("click", () => {
fetch("/reload-plugins", { method: "POST" })
  .then(() => loadPlugins())
  .catch((err) => console.error("Erro ao recarregar plugins:", err));
});
});