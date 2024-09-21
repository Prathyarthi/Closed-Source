'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Login</h1>
        <button
          onClick={() => signIn('github')}
          className="w-full rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}
