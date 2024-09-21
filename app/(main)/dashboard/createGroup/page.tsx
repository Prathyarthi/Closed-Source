'use client';

import { axiosInstance } from '@/axiosInstance';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function CreateGroup() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const createGroup = async () => {
    try {
      const res = await axiosInstance.post('/api/groups', {
        name,
        description,
        maintainerId: 1,
      });

      if (res.status === 201) {
        router.push('/dashboard/groups');
      }
    } catch (error) {}
  };

  return (
    <div>
      <h1>Create a New Group</h1>
      <input
        type="text"
        placeholder="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Group Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createGroup}>Create Group</button>
    </div>
  );
}

export default CreateGroup;
