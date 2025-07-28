'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminLoggedIn } from '../lib/auth';

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const isAuth = isAdminLoggedIn();
    console.log(isAuth)
    if (!isAuth) {
      router.push('/'); // redirect to home if not admin
    } else {
      setAuthChecked(true); // show page content
    }
  }, []);

  if (!authChecked) return null; // prevent flash before redirect

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
    </div>
  );
}
