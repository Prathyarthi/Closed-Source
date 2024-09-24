import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
  }

  interface Session {
    user: {
      email: string;
      image: string;
      id: string;
      role: string;
    };
  }

  interface JWT {
    id: string;
    role: string;
  }
}
