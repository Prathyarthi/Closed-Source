// 'use client';

// import { signOut } from 'next-auth/react';
// import React, { useEffect } from 'react';
// import { Toaster } from '@/components/ui/sonner';
// import { toast } from 'sonner';

// const page = () => {
//   useEffect(() => {
//     signOut({
//       callbackUrl: '/signin',
//     });
//     toast('Too many devices connected. Logging out!', {
//       action: {
//         label: 'Close',
//         onClick: () => toast.dismiss(),
//       },
//     });
//   }, []);

//   return (
//     <div>
//       <Toaster />
//     </div>
//   );
// };

// export default page;

import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Invalidsession Page</h1>
      <p>
        Go to{' '}
        <Link href="/" className="text-blue-400 underline">
          Home
        </Link>
      </p>
    </div>
  );
};

export default page;
