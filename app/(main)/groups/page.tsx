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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useSession } from 'next-auth/react';
import { fetchProjectsByMaintainerId } from '@/lib/actions/projects.action';

function Groups() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groups, setGroups] = useState<any>([]);

  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const session = useSession();

  const handleCreateGroup = async () => {
    await createGroup(name, description);

    await handleFetchGroups();

    setIsDialogOpen(false);
    router.push('/groups');
  };

  const handleFetchGroups = async () => {
    const res = await fetchGroups();
    setGroups(res);
  };

  const fetchProjects = async () => {
    const maintainerId = session.data?.user?.id;
    if (maintainerId) {
      const maintainerProjects =
        await fetchProjectsByMaintainerId(maintainerId);
      setProjects(maintainerProjects);
    }
  };

  useEffect(() => {
    handleFetchGroups();
  }, []);

  return (
    <div className="mx-auto flex h-auto max-w-6xl flex-col justify-between">
      <div className="flex w-full justify-between">
        <div className="">
          <h1 className="text-3xl font-medium text-blue-400">Groups</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <PlusCircle />
              <p className="ml-2">Add Group</p>
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
      <div className="my-10 grid min-h-[70vh] grid-cols-3 justify-center gap-4">
        <div className="">
          {groups.length === 0 ? (
            <h1>No groups</h1>
          ) : (
            <div className="flex h-auto flex-col justify-center gap-2">
              {groups.map((group: any, index: number) => (
                <div
                  key={index}
                  className="space-y-2 rounded-lg border px-4 py-2 shadow-md dark:border-white/[0.2] dark:bg-gray-800"
                >
                  <h2 className="text-xl">{group.name}</h2>
                  <p className="text-sm">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm">
                      created by{' '}
                      <span className="ml-2 text-muted-foreground">
                        {group.maintainer.name}
                      </span>
                    </h1>
                    <div className="flex space-x-4">
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button>Assign Project</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Project</DialogTitle>
                            <DialogDescription className="space-y-4">
                              <Select
                                value={selectedGroup}
                                onValueChange={(value) =>
                                  setSelectedGroup(value)
                                }
                              >
                                <SelectTrigger className="w-[380px]">
                                  <SelectValue placeholder="Select a Project" />
                                </SelectTrigger>
                                <SelectContent>
                                  {projects.length > 0 ? (
                                    projects.map((project: any) => (
                                      <SelectItem
                                        key={project.id}
                                        value={project.id}
                                      >
                                        {project.name}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem value="none">
                                      No Projects Available
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                              <Button onClick={handleAssignProject}>
                                Assign
                              </Button>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Button
                        onClick={() => router.push(`/groups/${group.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Groups;
