// Função init do plugin
export function init(api) {
  // Usa a API fornecida para interagir com o site
  api.log("Plugin 1 inicializado!");
  api.addContent("<h3>Conteúdo adicionado pelo Plugin 1</h3>");
}