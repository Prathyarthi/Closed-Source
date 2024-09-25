import React from 'react';
import Image from 'next/image';

export default function UserImage({ image }: any) {
  return (
    <div>
      <Image
        className="h-full w-full cursor-pointer rounded-full"
        src={image || ''}
        width={100}
        height={100}
        alt="user_profile_image"
      />
    </div>
  );
}
