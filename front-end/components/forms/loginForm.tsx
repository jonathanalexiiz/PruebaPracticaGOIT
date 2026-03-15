/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { loginUser } from '@/lib/authApi';
import AuthCard from '@/components/ui/AuthCard';
import PasswordField from '@/components/ui/PasswordField';
import useRedirectIfAuthenticated from '@/components/hooks/useRedirectIfAuthenticated';

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  titulo: string;
  textoBoton: string;
  textoFooter: string;
  textoLink: string;
  hrefLink: string;
  redirectIfAuthenticated: string;
  redirectAfterSuccess: string;
};

export default function LoginForm({
  titulo,
  textoBoton,
  textoFooter,
  textoLink,
  hrefLink,
  redirectIfAuthenticated,
  redirectAfterSuccess,
}: LoginFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const { verificandoSesion } = useRedirectIfAuthenticated(
    redirectIfAuthenticated,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      router.replace(redirectAfterSuccess);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Error al iniciar sesión');
      }
    }
  };

  if (verificandoSesion) {
    return null;
  }

  return (
    <AuthCard titulo={titulo}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Correo</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className={`w-full rounded-xl border bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
              errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-300 focus:border-blue-500'
            }`}
            {...register('email', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Correo no válido',
              },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <PasswordField
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          error={errors.password?.message}
          register={register('password', {
            required: 'La contraseña es obligatoria',
          })}
        />

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-blue-600 p-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Ingresando...' : textoBoton}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        {textoFooter}{' '}
        <Link
          href={hrefLink}
          className="font-semibold text-blue-600 hover:underline"
        >
          {textoLink}
        </Link>
      </p>
    </AuthCard>
  );
}