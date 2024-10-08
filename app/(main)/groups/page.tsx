'use client';

import { useEffect, useState } from 'react';
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
import { createGroup, fetchGroups } from '@/lib/actions/groups.actions';
import { useRouter } from 'next/navigation';

function Groups() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groups, setGroups] = useState<any>([]);
  console.log(groups);

  const router = useRouter();

  const handleCreateGroup = async () => {
    const response = await createGroup(name, description);
    console.log(response);

    router.push('/groups');
  };

  const handleFetchGroups = async () => {
    const res = await fetchGroups();
    setGroups(res);
  };
  useEffect(() => {
    handleFetchGroups();
  }, [groups]);
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-6xl justify-between">
      <div className="">
        <h1 className="text-3xl font-medium text-blue-400">Groups</h1>
        <div className="flex h-auto w-full items-center justify-center">
          {groups.length === 0 ? (
            <h1>No groups</h1>
          ) : (
            <div className="flex h-auto flex-col items-center justify-center gap-2">
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
      <div className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <p className="mr-2">Add Group</p>
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
    </div>
  );
}

export default Groups;
