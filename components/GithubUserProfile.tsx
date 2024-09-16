// "use client"

// import { getUser } from "@/lib/actions/user.actions";
// import { UserButton, useUser } from "@clerk/nextjs";
// import axios from "axios";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default async function GithubUserProfile() {

//     const user = await getUser()

//     const [username, setUsername] = useState('');
//     const [avatar, setAvatar] = useState("");

//     useEffect(() => {
//         async function fetchUserData() {
//             const user = await getUser();
//             if (user?.firstName) {
//                 try {
//                     const res = await axios.get(`https://api.github.com/users/${user.firstName}`);
//                     setUsername(res.data.login);
//                     setAvatar(res.data.avatar_url);
//                     console.log(res.data.login);
//                 } catch (error) {
//                     console.error("Error fetching GitHub data:", error);
//                 }
//             }
//         }

//         fetchUserData();
//     }, []);

//     return (
//         <div className="min-h-screen">
//             <div className="flex justify-end p-5">
//                 {username}
//                 <Image src={avatar} alt="avatar" width={50} height={50} className="rounded-full" />
//             </div>
//         </div>
//     );
// }

"use client";

import { getUser } from "@/lib/actions/user.actions";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function GithubUserProfile() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  // Fetch user and GitHub data on the client-side
  useEffect(() => {
    async function fetchUserData() {
      const user = await getUser();
      console.log(user);

      if (user?.firstName) {
        try {
          const res = await axios.get(
            `https://api.github.com/users/${user.username}`
          );
          setUsername(res.data.login);
          setAvatar(res.data.avatar_url);
          console.log(res.data.login);
        } catch (error) {
          console.error("Error fetching GitHub data:", error);
        }
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex justify-end p-5">
        {username && <span>{username}</span>}
        {avatar && (
          <Image
            src={avatar}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
      </div>
    </div>
  );
}
