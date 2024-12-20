<?php
session_start();

include 'Contato.class.php';
$contato = new Contato();

if (isset($_SESSION['nome'])) {
<<<<<<< HEAD
    header("Location: app.php");
=======
    header("Location: test.php");
>>>>>>> baefa0981c5456f0637b556b1704ce2dcf7da4a3
    exit;
}

if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $dados = $contato->checkUserPass($email, $senha);

    if ($dados) {
        $_SESSION['nome'] = $dados['nome'];
        $_SESSION['email'] = $dados['email'];

        header("Location: test.php");
        exit;
    } else {
        echo "<script>alert('Email ou senha incorretos!');</script>";
    }
}

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Página de login com opções para login social, alternância de visibilidade da senha e link para criar uma nova conta.">
  <title>Login</title>

  <!-- links css -->
  <link rel="stylesheet" href="./assets/css/global.css">
  <link rel="stylesheet" href="./assets/css/login.css?v=1">

  <!-- scripts JavaScript -->
  <script src="./backend/form-validation.js" defer></script>
  <script src="./backend/Global.js" defer></script>
  <script src="./backend/LanguageToggle.js" defer></script>
  <script src="./backend/PasswordToggle.js" defer></script>
</head>

<body>
  <header id="navigation-header">
    <nav id="navbar">
      <div id="logo-container">
        <img src="#" alt="Logo" id="logo">
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

  <main id="login-container">
    <section id="login-box">

      <form id="login-form" method="POST">
        <label for="email" data-translate="emailLabel">Email</label>
        <input type="email" id="email" name="email" required>

        <label for="password" data-translate="passwordLabel">Senha</label>
        <div class="password-input-container">
          <input type="password" name="senha" id="password" required>
          <span id="icon-toggle-password">
            <img src="./assets/images/eye-open.png" alt="Toggle password visibility" width="20" id="toggle-icon">
          </span>
        </div>

        <div class="container-options">
          <label class="container-checkbox">
            <input type="checkbox" class="checkbox-terms" required>
            <span data-translate="termsAgreement">Concordo com os</span> <a href="#" data-translate="termsLink">termos de uso</a>
          </label>
          <a href="#" class="link-forgot-password" data-translate="forgotPassword">Esqueceu sua senha?</a>
        </div>

        <button type="submit" name="login" value="Login" id="button-login-submit" data-translate="loginButton">Login</button>

        <div id="social-login-buttons">
          <button class="button-social-login">
            <img src="./assets/images/google-logo.png" alt="Google Icon" class="icon-social">
            <span class="social-text">Continue com Google</span>
          </button>
          <button class="button-social-login">
            <img src="./assets/images/twitter-logo.png" alt="Twitter Icon" class="icon-social">
            <span class="social-text">Continue com Twitter</span>
          </button>
          <button class="button-social-login">
            <img src="./assets/images/github-logo.png" alt="GitHub Icon" class="icon-social">
            <span class="social-text">Continue com GitHub</span>
          </button>
        </div>
        <div id="button-container-signup">
        <button id="button-signup-create-account">
          <a href="cadastrar.php" class="esqueceu" data-translate="createAccountButton">Criar conta</a>
        </button>
      </div>
      </form>
      <div id="qrcode-box" ><img src=".\assets\images\images.png" alt="qrcode" id="qrcode-image"></div>
    </section>
  </main>
</body>

</html>