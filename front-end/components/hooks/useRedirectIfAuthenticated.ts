/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useRedirectIfAuthenticated(redirectTo: string) {
  const router = useRouter();
  const [verificandoSesion, setVerificandoSesion] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      router.replace(redirectTo);
      return;
    }

    setVerificandoSesion(false);
  }, [router, redirectTo]);

  return { verificandoSesion };
}