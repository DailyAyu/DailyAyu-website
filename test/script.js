document.getElementById("app-icon").addEventListener("click", function() {
  document.getElementById("hidden-menu").classList.toggle("active");
});

document.getElementById("profile-pic").addEventListener("click", function() {
  document.getElementById("profile-config").classList.toggle("active");
});

function adicionarPlugins() {
  const pluginsContainer = document.getElementById('plugins-link-conteiner');

  const plugins = ['Plugin 1', 'Plugin 2', 'Plugin 3'];

  const ul = document.createElement('ul');
  plugins.forEach(plugin => {
      const li = document.createElement('li');
      li.textContent = plugin;
      ul.appendChild(li);
  });

  pluginsContainer.appendChild(ul);
}

function toggleMenu() {
  const menu = document.getElementById('hidden-menu');
  menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

document.getElementById('plugin-search').addEventListener('input', function(event) {
  const query = event.target.value.toLowerCase();
  const pluginsList = document.querySelectorAll('#plugins-link-conteiner li');
  
  pluginsList.forEach(plugin => {
      const pluginText = plugin.textContent.toLowerCase();
      plugin.style.display = pluginText.includes(query) ? 'block' : 'none';
  });
});

adicionarPlugins();
