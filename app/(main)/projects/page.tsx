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
import {
  assignGroupToProject,
  createProject,
  fetchProjects,
} from '@/lib/actions/projects.action';
import { useRouter } from 'next/navigation';
import { fetchGroups } from '@/lib/actions/groups.actions';
import { useToast } from '@/hooks/use-toast';

function Projects() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<any>([]);
  const [groups, setGroups] = useState<any>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const handleCreateProject = async () => {
    await createProject(name, description);
    await handleFetchProjects();
    setIsDialogOpen(false);
    router.push('/projects');
  };

  const handleFetchProjects = async () => {
    const projectslist = await fetchProjects();
    const groupslist = await fetchGroups();
    setGroups(groupslist);
    setProjects(projectslist);
  };

  useEffect(() => {
    handleFetchProjects();
  }, []);

  const handleAssignGroup = async (groupId: string, projectId: string) => {
    // Check if the group is already assigned to any project
    const isGroupAssigned = projects.some(
      (project: any) => project.groupId === groupId,
    );

    if (isGroupAssigned) {
      toast({
        variant: 'destructive',
        title: 'Group Already Assigned',
        description: 'This group is already assigned to another project.',
      });
      return;
    }

    await assignGroupToProject(groupId, projectId);
    toast({
      variant: 'default',
      title: 'Group Assigned',
      description: 'The group has been successfully assigned to the project.',
    });
    await handleFetchProjects(); // Refresh projects after assignment
  };

  return (
    <div className="mx-auto flex h-auto max-w-6xl flex-col justify-between">
      <div className="flex w-full justify-between">
        <div>
          <h1 className="text-3xl font-medium text-blue-400">Projects</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <PlusCircle />
              <p className="ml-2">Add Project</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription className="space-y-4">
                <Input
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Project Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleCreateProject}>Create</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex min-h-[70vh] items-center justify-center gap-4">
        <div>
          {projects.length === 0 ? (
            <h1>No projects</h1>
          ) : (
            <div className="flex h-auto flex-col items-center justify-center gap-2">
              {projects.map((project: any) => (
                <div
                  key={project.id}
                  className="space-y-3 rounded-lg border px-6 py-3"
                >
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                  <div>
                    <h1 className="text-sm">
                      created by{' '}
                      <span className="ml-2 text-muted-foreground">
                        {project.maintainer.name}
                      </span>
                    </h1>
                  </div>
                  <div>
                    <Dialog
                      onOpenChange={(open) => {
                        if (!open) setCurrentProjectId(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setCurrentProjectId(project.id)} // Set the current project ID before opening the dialog
                        >
                          Assign Group
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-blue-400">
                            Assign A Group to Project
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          {groups.map((group: any) => (
                            <div
                              key={group.id}
                              className="flex items-center justify-between space-y-3"
                            >
                              <h1 className="text-lg text-foreground">
                                {group.name}
                              </h1>
                              <Button
                                variant={'ghost'}
                                onClick={() =>
                                  handleAssignGroup(group.id, currentProjectId!)
                                }
                              >
                                Assign
                              </Button>
                            </div>
                          ))}
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
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

export default Projects;
