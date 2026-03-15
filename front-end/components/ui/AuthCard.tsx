import type { ReactNode } from 'react';

type AuthCardProps = {
  titulo: string;
  children: ReactNode;
};

export default function AuthCard({ titulo, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800">{titulo}</h1>
      </div>

      {children}
    </div>
  );
}