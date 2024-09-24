// 'use client';

// import { signIn } from 'next-auth/react';

// export default function Login() {
//   return (
//     <div className="flex h-[80vh] items-center justify-center">
//       <div className="rounded bg-white p-6 shadow-md">
//         <h1 className="mb-4 text-2xl font-bold text-gray-800">Login</h1>
//         <button
//           type="button"
//           onClick={(e) => signIn('github')}
//           className="w-full rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
//         >
//           Login with GitHub
//         </button>
//       </div>
//     </div>
//   );
// }

import { Suspense } from 'react';
import Signin from '@/components/Signin';

const SigninPage = async () => {
  return (
    <Suspense>
      {' '}
      <Signin />{' '}
    </Suspense>
  );
};

export default SigninPage;
