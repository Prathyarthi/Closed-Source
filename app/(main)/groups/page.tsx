'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createGroup, fetchGroups } from '@/lib/actions/groups.actions';
import {
  assignProjectToGroup,
  fetchProjectsByMaintainerId,
  removeProjectFromGroup,
} from '@/lib/actions/projects.action';
import { PlusCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Groups = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignedDialogOpen, setIsAssignedDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groups, setGroups] = useState<any>([]);
  const [projects, setProjects] = useState<any>([]);
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  const handleFetchGroups = async () => {
    const res = await fetchGroups();
    const projectRes = await fetchProjectsByMaintainerId(
      session.data?.user?.id as string,
    );
    setProjects(projectRes);
    setGroups(res);
  };

  const handleCreateGroup = async () => {
    await createGroup(name, description);
    await handleFetchGroups();
    setIsDialogOpen(false);
    toast({
      title: 'Group Created',
      description: 'Your new group has been successfully created!',
    });
  };

  const handleAssignProject = async (groupId: string, projectId: string) => {
    await assignProjectToGroup(groupId, projectId);
    setIsAssignedDialogOpen(false);
    toast({
      title: 'Project Assigned',
      description: 'Project has been successfully assigned to the group.',
    });
    await handleFetchGroups();
  };

  const openAssignProjectDialog = (groupId: string) => {
    setCurrentGroupId(groupId);
    setIsAssignedDialogOpen(true);
  };

  const handleRemoveProject = async (groupId: string, projectId: string) => {
    await removeProjectFromGroup(groupId, projectId);
    await handleFetchGroups();
    toast({
      variant: 'destructive',
      title: 'Project Removed',
      description: 'Project has been removed from the group.',
    });
  };

  const getAvailableProjects = () => {
    const assignedProjectIds = groups
      .filter((group: any) => group.projectId)
      .map((group: any) => group.projectId);

    return projects.filter(
      (project: any) => !assignedProjectIds.includes(project.id),
    );
  };

  useEffect(() => {
    handleFetchGroups();
  }, []);

  return (
    <div className="mx-auto flex h-auto max-w-6xl flex-col py-8">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold text-blue-500">Groups</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-5 w-5" />
              <span className="ml-2">Add Group</span>
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
                <Button onClick={handleCreateGroup} variant={'default'}>
                  Create
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {groups.length === 0 ? (
          <div className="col-span-2 text-center text-gray-400">
            <p className="text-lg">No groups found</p>
          </div>
        ) : (
          groups.map((group: any) => (
            <div
              key={group.id}
              className="flex flex-col justify-between rounded-lg border border-gray-600 bg-secondary p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="mb-2 text-lg font-medium text-primary">
                    {group.name}
                  </h2>
                  <p className="line-clamp-1 max-w-[260px] text-sm text-secondary-foreground/80">
                    {group.description}
                  </p>
                </div>
                <div className="">
                  <h1 className="text-base">
                    Maintainer :{' '}
                    <span className="text-blue-400">
                      {group.maintainer.name}
                    </span>
                  </h1>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                {!group.projectId ? (
                  <Button
                    variant={'default'}
                    onClick={() => openAssignProjectDialog(group.id)}
                  >
                    Assign Project
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleRemoveProject(group.id, group.projectId)
                    }
                    variant="destructive"
                  >
                    Remove
                  </Button>
                )}
                <Button
                  variant={'default'}
                  onClick={() => router.push(`/groups/${group.id}`)}
                >
                  View
                </Button>
              </div>

              {/* Assign Project Dialog */}
              <Dialog
                open={isAssignedDialogOpen && currentGroupId === group.id}
                onOpenChange={setIsAssignedDialogOpen}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Your Project</DialogTitle>
                    <DialogDescription className="space-y-4">
                      {getAvailableProjects().length === 0 ? (
                        <p className="text-center text-gray-500">
                          No available projects to assign
                        </p>
                      ) : (
                        getAvailableProjects().map((project: any) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between rounded-md bg-secondary p-4 shadow-md transition hover:shadow-lg"
                          >
                            <div>
                              <h3 className="text-base font-medium text-gray-200">
                                {project.name}
                              </h3>
                            </div>
                            <Button
                              variant={'default'}
                              onClick={() =>
                                handleAssignProject(group.id, project.id)
                              }
                            >
                              Assign
                            </Button>
                          </div>
                        ))
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Groups;
