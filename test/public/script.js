document.addEventListener("DOMContentLoaded", () => {
  const appIcon = document.getElementById("app-icon");
  const hiddenMenu = document.getElementById("hidden-menu");
  const pluginsContainer = document.getElementById("plugins-link-conteiner");

  // Abrir/fechar menu
  appIcon.addEventListener("click", () => {
    hiddenMenu.classList.toggle("active");
  });

  // Carregar lista de plugins do servidor
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