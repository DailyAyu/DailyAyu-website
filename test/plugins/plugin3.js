module.exports.info = {
  name: "AlteraFundo",
  description: "Altera o fundo da página para uma cor aleatória"
};

module.exports.activate = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF8C33"];
  document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  alert('Olá Mundo');
};