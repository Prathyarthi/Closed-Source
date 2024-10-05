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

function Groups() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col">
      <div className="flex justify-end">
        <Button asChild>
          <Dialog>
            <DialogTrigger>
              <PlusCircle />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
                <DialogDescription className="space-y-4">
                  <Input placeholder="Group Name" />
                  <Input placeholder="Group Description" />
                  <Button>Create</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Button>
      </div>
      <div>Hey</div>
    </div>
  );
}

export default Groups;
