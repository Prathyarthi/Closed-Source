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

function Projects() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-end">
      <Button asChild>
        <Dialog>
          <DialogTrigger>
            <PlusCircle />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription className="space-y-4">
                <Input placeholder="Project Name" />
                <Input placeholder="Project Description" />
                <Button>Create</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Button>
    </div>
  );
}

export default Projects;
