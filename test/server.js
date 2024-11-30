const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Diretório dos plugins
const pluginsDir = path.join(__dirname, "plugins");

// Carregar plugins dinamicamente
let plugins = [];
function loadPlugins() {
  plugins = [];
  fs.readdirSync(pluginsDir).forEach((file) => {
    if (file.endsWith(".js")) {
      const pluginPath = path.join(pluginsDir, file);
      
      // Remover o módulo da cache do require
      delete require.cache[require.resolve(pluginPath)];
      
      const plugin = require(pluginPath);
      plugins.push(plugin.info || { name: file, description: "Sem descrição" });
    }
  });
}

// Inicialmente, carregue os plugins
loadPlugins();

// Rota para listar plugins
app.get("/plugins-list", (req, res) => {
  res.json(plugins);
});

// Rota para adicionar um novo plugin (simulação para testes locais)
app.post("/reload-plugins", (req, res) => {
  loadPlugins();
  res.json({ message: "Plugins recarregados!" });
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});