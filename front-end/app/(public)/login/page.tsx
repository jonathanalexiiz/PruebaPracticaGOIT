import LoginForm from '@/components/forms/loginForm';

export default function LoginPage() {
  return (
    <LoginForm
      titulo="Iniciar sesión"
      textoBoton="Iniciar sesión"
      textoFooter="¿No tienes cuenta?"
      textoLink="Regístrate aquí"
      hrefLink="/register"
      redirectIfAuthenticated="/dashboard"
      redirectAfterSuccess="/dashboard"
    />
  );
}