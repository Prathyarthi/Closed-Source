// import React from 'react';

// const page = () => {
//   return (
//     <main>
//       <div className="flex h-[80vh] items-center justify-center text-4xl">
//         <h1>This is dashboard</h1>
//       </div>
//     </main>
//   );
// };

// export default page;

'use client';

import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();
  const [data, setData] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setData(JSON.stringify(session.user, null, 2));
      setImage(session.user.image);
    }
  }, [session]);

  return (
    <div className="">
      <pre>{data}</pre>
      <button
        className="rounded-xl bg-blue-500 px-4 py-2 text-white"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
};

export default Home;
