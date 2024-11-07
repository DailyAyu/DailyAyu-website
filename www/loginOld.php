<?php
session_start();
require 'Contato.class.php';

if(isset($_POST['email']) && !empty($_POST['email'])){
	$nome  = $_POST['nome'];
	$email = $_POST['email'];
	$senha = md5($_POST['senha']);

	$contato = new Contato();
	
	$chkUser = $contato->checkUser($email);

	if(!empty($chkUser)){
		$chkPass = $contato->checkPass($email, $senha);
		if(!empty($chkPass)){
			$_SESSION['nome'] =  $chkPass['nome'];
			header("location:index.php");
		}else{
			?>
			<script>
				var resultado = confirm("Usuario ou senha inválidos!\nClique OK para voltar para o login");
				if (resultado == true){
					window.location.replace('login.php')
				}
			</script>
			<?php  
		}
	}else{
		?>
		<script>
			var resultado = confirm("Usuario NÃO cadastrado!\nClique OK para Cadastrar");
			if (resultado == true){
				window.location.replace('login.php')
			}
		</script>
		<?php  
	}
}
?>


<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Página de login com opções para login social, alternância de visibilidade da senha e link para criar uma nova conta.">
  <title>Página de Login | Autenticação de Usuário</title>

  <!-- links css -->
  <link rel="stylesheet" href="./assets/css/global.css">
  <link rel="stylesheet" href="./assets/css/login.css">
  <link rel="stylesheet" href="./assets/css/navbar.css">

  <!-- scripts JavaScript -->
  <script src="./backend/form-validation.js" defer></script>
  <script src="./backend/Global.js" defer></script>
  <script src="./backend/LanguageToggle.js" defer></script>
  <script src="./backend/PasswordToggle.js" defer></script>
  <script>
				acesso();
			</script>	

</head>

<body>

  <!-- Header com Navbar -->
  <header id="navigation-header">
    <nav id="navbar">
      <div id="logo-container">
        <img src="https://www.example.com/logo-placeholder.png" alt="" id="logo">
      </div>
      <div id="navigation-buttons">
        <select id="language-selector" aria-label="Selecione o idioma">
          <option value="pt">Português (Brasil)</option>
		  <option value="en">English (United States)</option>
          <option value="es">Español</option>
        </select>
        <button class="button-login" data-translate="loginButton">Login</button>
        <button id="button-signup" data-translate="buttonSignup">Cadastrar</button>
      </div>
    </nav>
  </header>

  <!-- Main Container de Login -->
  <main id="login-container">
    <section id="login-box">



      <!-- Formulário de Login -->
      <form id="login-form">
        <label for="email" data-translate="emailLabel">Email</label>
        <input type="email" id="email" required>

        <label for="password" data-translate="passwordLabel">Senha</label>
        <div class="password-input-container">
          <input type="password" id="password" required>

          <span id="icon-toggle-password">
            <img src="./assets/images/eye-open.png" alt="Toggle password visibility" width="20" id="toggle-icon">
          </span>
        </div>


        
<div class="container-options">
<label class="container-checkbox">
    <input type="checkbox" class="checkbox-terms" required>
    <span data-translate="termsAgreement">Concordo com os</span> <a href="#" data-translate="termsLink">termos de uso</a>
</label>
  </label>
  <a href="#" class="link-forgot-password" data-translate="forgotPassword">Esqueceu sua senha?</a>
</div>
  

        <button type="submit" id="button-login-submit" data-translate="loginButton" disabled>Login</button>

		<!-- Botões de Login Social -->
		   <div id="social-login-buttons">
        <button class="button-social-login">
          <img src="./assets/images/google-logo.png" alt="Google Icon" class="icon-social">
          <span class="social-text" >Continue com Google</span>
        </button>
        <button class="button-social-login">
          <img src="./assets/images/twitter-logo.png" alt="Twitter Icon" class="icon-social">
          <span class="social-text" >Continue com Twitter</span>
        </button>
        <button class="button-social-login">
          <img src="./assets/images/github-logo.png" alt="GitHub Icon" class="icon-social">
          <span class="social-text" >Continue com GitHub</span>
        </button>
      </div>
	</form>

      <div id="button-container-signup">
        <button id="button-signup-create-account" disabled > <a href='cadastrar.php' class = "esqueceu" data-translate="createAccountButton">criar conta</a></button>
      </div>
    </section>
  </main>
</body>

</html>

