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
  assignProjectToGroup,
  createProject,
  fetchProjects,
  removeProjectFromGroup, // Add action for removing group
} from '@/lib/actions/projects.action';
import { useRouter } from 'next/navigation';
import { fetchGroups } from '@/lib/actions/groups.actions';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

function Projects() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<any>([]);
  const [groups, setGroups] = useState<any>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const [repoUrl, setRepoUrl] = useState('');
  const [techStack, setTechStack] = useState('');
  const [setupInstructions, setSetupInstructions] = useState('');

  const { toast } = useToast();
  const router = useRouter();

  const handleCreateProject = async () => {
    await createProject(
      name,
      description,
      repoUrl,
      techStack,
      setupInstructions,
    );
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

    await assignProjectToGroup(groupId, projectId);
    toast({
      variant: 'default',
      title: 'Group Assigned',
      description: 'The group has been successfully assigned to the project.',
    });
    await handleFetchProjects(); // Refresh projects after assignment
  };

  const handleRemoveGroup = async (groupId: string, projectId: string) => {
    await removeProjectFromGroup(groupId, projectId);
    toast({
      variant: 'default',
      title: 'Group Removed',
      description: 'The group has been successfully removed from the project.',
    });
    await handleFetchProjects(); // Refresh projects after removal
  };

  return (
    <div className="mx-auto flex h-auto max-w-6xl flex-col py-8">
      <div className="mb-6 flex w-full justify-between">
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
                <Input
                  placeholder="Github Url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
                <Input
                  placeholder="Tech stack (separated by comma)"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                />
                <Textarea
                  placeholder="Instructions for setup"
                  value={setupInstructions}
                  onChange={(e) => setSetupInstructions(e.target.value)}
                />
                <Button onClick={handleCreateProject}>Create</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <h1>No projects</h1>
        ) : (
          projects.map((project: any) => (
            <div
              key={project.id}
              className="flex flex-col justify-between gap-4 rounded-lg border border-gray-600 bg-secondary p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-between">
                <div className="">
                  <h2 className="mb-2 text-lg font-medium text-primary">
                    {project.name}
                  </h2>
                  <p className="line-clamp-1 max-w-[260px] text-sm text-secondary-foreground/80">
                    {project.description}
                  </p>
                </div>
                <div>
                  <h1 className="text-base">
                    Manintainer :
                    <span className="text-blue-400">
                      {project.maintainer.name}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="">
                <Button onClick={() => router.push(`/projects/${project.id}`)}>
                  View
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;
