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
import { createProject, fetchProjects } from '@/lib/actions/projects.action';
import { useRouter } from 'next/navigation';

function Projects() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<any>([]);
  console.log(projects);

  const router = useRouter();

  const handleCreateProject = async () => {
    const response = await createProject(name, description);
    console.log(response);

    router.push('/projects');
  };

  const handleFetchProjects = async () => {
    const res = await fetchProjects();
    setProjects(res);
  };

  useEffect(() => {
    handleFetchProjects();
  }, [projects]);

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-6xl justify-between">
      <div className="">
        <h1 className="text-3xl font-medium text-blue-400">Projects</h1>
        <div className="flex h-auto w-full items-center justify-center">
          {projects.length === 0 ? (
            <h1>No projects</h1>
          ) : (
            <div className="flex h-auto flex-col items-center justify-center gap-2">
              {projects.map((project: any, index: number) => (
                <div key={index}>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
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
              <p className="mr-2">Add Project</p>
              <PlusCircle />
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
    </div>
  );
}

export default Projects;
