import RegisterForm from '@/components/forms/registerForm';

export default function RegisterPage() {
  return (
    <RegisterForm
      titulo="Crear cuenta"
      textoBoton="Registrarse"
      textoFooter="¿Ya tienes cuenta?"
      textoLink="Inicia sesión aquí"
      hrefLink="/login"
      redirectAfterSuccess="/login"
    />
  );
}