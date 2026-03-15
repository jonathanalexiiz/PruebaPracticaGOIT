'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
};

export default function PasswordField({
  label,
  placeholder,
  error,
  register,
}: PasswordFieldProps) {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <div className="relative">
        <input
          type={mostrarPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-slate-50 p-3 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-slate-300 focus:border-blue-500'
          }`}
          {...register}
        />

        <button
          type="button"
          onClick={() => setMostrarPassword(!mostrarPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
        >
          {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}