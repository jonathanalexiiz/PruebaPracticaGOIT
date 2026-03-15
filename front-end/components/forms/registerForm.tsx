/* eslint-disable react-hooks/incompatible-library */
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { registerUser } from '@/lib/authApi';
import AuthCard from '@/components/ui/AuthCard';
import PasswordField from '@/components/ui/PasswordField';
import useRedirectIfAuthenticated from '@/components/hooks/useRedirectIfAuthenticated';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  titulo: string;
  textoBoton: string;
  textoFooter: string;
  textoLink: string;
  hrefLink: string;
  redirectAfterSuccess: string;
};

export default function RegisterForm({
  titulo,
  textoBoton,
  textoFooter,
  textoLink,
  hrefLink,
  redirectAfterSuccess,
}: RegisterFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const { verificandoSesion } = useRedirectIfAuthenticated('/dashboard');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      router.replace(redirectAfterSuccess);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Error al registrar usuario');
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
          <label className="text-sm font-medium text-slate-700">Nombre</label>
          <input
            type="text"
            placeholder="Tu nombre completo"
            className={`w-full rounded-xl border bg-slate-50 p-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
              errors.name
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-300 focus:border-blue-500'
            }`}
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres',
              },
            })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

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
          placeholder="Crea una contraseña"
          error={errors.password?.message}
          register={register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
        />

        <PasswordField
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          error={errors.confirmPassword?.message}
          register={register('confirmPassword', {
            required: 'Debes confirmar la contraseña',
            validate: (value) =>
              value === password || 'Las contraseñas no coinciden',
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
          {isSubmitting ? 'Registrando...' : textoBoton}
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