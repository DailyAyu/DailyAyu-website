document.addEventListener("DOMContentLoaded", () => {
  const appIcon = document.getElementById("app-icon");
  const hiddenMenu = document.getElementById("hidden-menu");
  const pluginsContainer = document.getElementById("plugins-link-conteiner");

  // Abrir/fechar menu
  appIcon.addEventListener("click", () => {
    hiddenMenu.classList.toggle("active");
  });

async function carregarPlugins() {
  try {
    // Faz a requisição para listar os plugins
    const response = await fetch("/plugins");
    const plugins = await response.json();

    // Verifica se há plugins para adicionar
    if (plugins && plugins.length > 0) {
      // Limpa o container de plugins antes de adicionar novos
      pluginsContainer.innerHTML = "";

      // Adiciona os plugins ao HTML
      plugins.forEach(plugin => {
        const pluginDiv = document.createElement("div");
        pluginDiv.classList.add("plugin");

        // Adiciona o nome e a descrição do plugin
        pluginDiv.innerHTML = `
          <h3>${plugin.name}</h3>
          <p>${plugin.description}</p>
        `;

        // Adiciona o plugin ao container
        pluginsContainer.appendChild(pluginDiv);
      });
    } else {
      console.log("Nenhum plugin encontrado.");
    }
  } catch (error) {
    console.error("Erro ao carregar plugins:", error);
  }
}

  carregarPlugins();

  // Adicionar listener para recarregar plugins manualmente
  document.getElementById("reload-plugins-btn").addEventListener("click", () => {
    fetch("/reload-plugins", { method: "POST" })
      .then(() => carregarPlugins()) // Recarregar plugins quando o botão for pressionado
      .catch((err) => console.error("Erro ao recarregar plugins:", err));
  });
});