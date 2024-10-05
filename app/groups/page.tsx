'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { createGroup } from '@/lib/actions/groups.actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Groups() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groups, setGroups] = useState<any>([]);

  const router = useRouter();

  const handleCreateGroup = async () => {
    const response = await createGroup(name, description);
    setGroups([...groups, response]);
    console.log(response);
    router.push('/groups');
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col">
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Group</DialogTitle>
              <DialogDescription className="space-y-4">
                <Input
                  placeholder="Group Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Group Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleCreateGroup}>Create</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <h1>Groups</h1>
        {groups.length === 0 ? (
          <h1>No groups</h1>
        ) : (
          <div className="flex flex-col gap-2">
            {groups.map((group: any, index: number) => (
              <div key={index}>
                <h2>{group.name}</h2>
                <p>{group.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Groups;
