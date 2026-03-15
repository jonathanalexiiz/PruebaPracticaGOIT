'use client';

import type React from 'react';

type FormData = {
  name: string;
  description: string;
  color: string;
};

type ProjectFormProps = {
  tituloFormulario: string;
  subtituloFormulario: string;
  error: string | null;
  form: FormData;
  saving: boolean;
  editingId: string | null;
  textoCrear: string;
  textoActualizar: string;
  textoGuardando: string;
  textoCancelar: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function ProjectForm({
  tituloFormulario,
  subtituloFormulario,
  error,
  form,
  saving,
  editingId,
  textoCrear,
  textoActualizar,
  textoGuardando,
  textoCancelar,
  onChange,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-800">{tituloFormulario}</h2>
        <p className="mt-1 text-sm text-gray-500">{subtituloFormulario}</p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Nombre del proyecto"
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Color</label>
          <input
            name="color"
            value={form.color}
            onChange={onChange}
            type="color"
            className="h-12.5 w-full cursor-pointer rounded-xl border border-gray-300 bg-gray-50 px-2 py-2"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Descripción del proyecto"
            rows={4}
            className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving
              ? textoGuardando
              : editingId
                ? textoActualizar
                : textoCrear}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl bg-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
            >
              {textoCancelar}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}