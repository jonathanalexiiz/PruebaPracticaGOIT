/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/SideBar';
import Footer from '@/components/layout/Footer';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.replace('/login');
      return;
    }

    setAutorizado(true);
  }, [router]);

  if (!autorizado) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="min-h-125 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}