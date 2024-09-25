'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { LogOut, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserImage from './UserImage';

const dropDownData = [
  {
    name: 'Profile',
    icon: <UserRound size={15} />,
    href: '/profile',
  },
];

export default function UserAccountDropDown() {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-[2.5rem] w-[2.5rem] items-center justify-center p-[0.2rem]">
            {!user.image ? (
              <div className="rounded-md border-2 border-[#1a1a1a] p-1">
                <UserRound />
              </div>
            ) : (
              <UserImage image={user.image} />
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent className="!w-[15rem] -translate-x-10 translate-y-8 scale-110 shadow-lg dark:shadow-[#030712]">
            <DropdownMenuLabel className="flex items-center gap-4">
              <div className="flex !h-[2rem] !w-[2rem] items-center justify-center p-[0.2rem]">
                {!user.image ? (
                  <div className="rounded-full border-2 border-[#1a1a1a] p-1">
                    <UserRound />
                  </div>
                ) : (
                  <UserImage image={user.image} />
                )}
              </div>

              <div className="flex flex-col">
                <span className="max-w-[200px]">{user?.name}</span>
                <span className="max-w-[200px] text-[0.8rem] text-gray-400">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {dropDownData.map((item, index) => {
              return (
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => router.push('/profile')}
                  key={index}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            {user && (
              <DropdownMenuItem
                onClick={async () => {
                  await signOut();
                  router.push('/');
                }}
                className="flex gap-2 focus:bg-[#f34e4e]"
              >
                <LogOut size={15} />
                Logout
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
