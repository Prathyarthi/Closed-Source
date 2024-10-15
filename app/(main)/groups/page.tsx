// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { PlusCircle } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { createGroup, fetchGroups } from '@/lib/actions/groups.actions';
// import { useRouter } from 'next/navigation';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import { useSession } from 'next-auth/react';
// import {
//   assignProjectToGroup,
//   fetchProjectsByMaintainerId,
//   removeProjectFromGroup,
// } from '@/lib/actions/projects.action';

// function Groups() {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [groups, setGroups] = useState<any>([]);

//   const [selectedGroup, setSelectedGroup] = useState<any>(null);
//   const [selectedProject, setSelectedProject] = useState<any>(null);
//   const [projects, setProjects] = useState<any>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
//   const [assignedProjectId, setAssignedProjectId] = useState('');
//   const router = useRouter();

//   const session = useSession();
//   console.log('groups', groups);

//   // const handleCreateGroup = async () => {
//   //   await createGroup(name, description);

//   //   await handleFetchGroups();

//   //   setIsDialogOpen(false);
//   //   router.push('/groups');
//   // };

//   const handleFetchGroups = async () => {
//     const res = await fetchGroups();
//     console.log(res);

//     setGroups(res);
//     // setAssignedProjectId(res.projects[0].id);
//   };

//   const fetchProjects = async () => {
//     const maintainerId = session.data?.user.id;

//     if (maintainerId) {
//       const maintainerProjects =
//         await fetchProjectsByMaintainerId(maintainerId);
//       // console.log(maintainerProjects);

//       setProjects(maintainerProjects);
//     }
//   };

//   // const handleAssignProject = async () => {
//   //   if (selectedGroup && selectedProject) {
//   //     console.log(selectedGroup, selectedProject);

//   //     await assignProjectToGroup(selectedGroup, selectedProject);
//   //     // setGroups((prevGroups: any) =>
//   //     //   prevGroups.map((group: any) =>
//   //     //     group.id === selectedGroup
//   //     //       ? { ...group, assignedProjectId: selectedProject }
//   //     //       : group,
//   //     //   ),
//   //     // );
//   //     // setAssignedProjectId(selectedProject);
//   //     setIsAssignDialogOpen(false);
//   //   }
//   // };

//   // const handleRemoveAssignedProject = async () => {
//   //   if (selectedGroup) {
//   //     await assignProjectToGroup(selectedGroup, '');
//   //     setGroups((prevGroups: any) =>
//   //       prevGroups.map((group: any) =>
//   //         group.id === selectedGroup
//   //           ? { ...group, assignedProjectId: null }
//   //           : group,
//   //       ),
//   //     );
//   //     setIsAssignDialogOpen(false);
//   //   }
//   // };

//   const handleCreateGroup = async () => {
//     if (name && description) {
//       await createGroup(name, description);
//       router.push('/groups');
//     }
//   };

//   const handleAssignProject = async (groupId: string, projectId: string) => {
//     await assignProjectToGroup(groupId, projectId);
//   };

//   const handleRemoveAssignedProject = async (
//     groupId: string,
//     projectId: string,
//   ) => {
//     await removeProjectFromGroup(groupId, projectId);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       if (session.status === 'authenticated') {
//         await handleFetchGroups();
//         await fetchProjects();
//       }
//     };

//     fetchData();
//   }, [session.status]);

//   return (
//     <div className="mx-auto flex h-auto max-w-6xl flex-col justify-between">
//       <div className="flex w-full justify-between">
//         <div className="">
//           <h1 className="text-3xl font-medium text-blue-400">Groups</h1>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center">
//               <PlusCircle />
//               <p className="ml-2">Add Group</p>
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Create Group</DialogTitle>
//               <DialogDescription className="space-y-4">
//                 <Input
//                   placeholder="Group Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <Input
//                   placeholder="Group Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <Button onClick={handleCreateGroup}>Create</Button>
//               </DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         </Dialog>
//       </div>
//       <div className="my-10 grid min-h-[70vh] grid-cols-3 justify-center gap-4">
//         <div className="">
//           {groups.length === 0 ? (
//             <h1>No groups</h1>
//           ) : (
//             <div className="flex h-auto flex-col justify-center gap-2">
//               {groups.map((group: any, index: number) => (
//                 <div
//                   key={index}
//                   className="space-y-2 rounded-lg border px-4 py-2 shadow-md dark:border-white/[0.2] dark:bg-gray-800"
//                 >
//                   <h2 className="text-xl">{group.name}</h2>
//                   <p className="text-sm">{group.description}</p>
//                   <div className="flex items-center justify-between">
//                     <h1 className="text-sm">
//                       created by{' '}
//                       <span className="ml-2 text-muted-foreground">
//                         {group.maintainer.name}
//                       </span>
//                     </h1>
//                     <div className="flex space-x-4">
//                       {session.data?.user.id === group.maintainer.id && (
//                         <>
//                           {!group.projects ? (
//                             <Dialog
//                               open={isAssignDialogOpen}
//                               onOpenChange={setIsAssignDialogOpen}
//                             >
//                               <DialogTrigger asChild>
//                                 <Button
//                                   onClick={() => {
//                                     setSelectedGroup(group.id);
//                                   }}
//                                 >
//                                   Assign Project
//                                 </Button>
//                               </DialogTrigger>
//                               <DialogContent>
//                                 <DialogHeader>
//                                   <DialogTitle>Assign Project</DialogTitle>
//                                   <DialogDescription className="space-y-4">
//                                     <Select
//                                       value={selectedProject}
//                                       onValueChange={(value) =>
//                                         setSelectedProject(value)
//                                       }
//                                     >
//                                       <SelectTrigger className="w-[380px]">
//                                         <SelectValue placeholder="Select a Project" />
//                                       </SelectTrigger>
//                                       <SelectContent>
//                                         {projects.length > 0 ? (
//                                           projects.map((project: any) => (
//                                             <SelectItem
//                                               key={project.id}
//                                               value={project.id}
//                                             >
//                                               {project.name}
//                                             </SelectItem>
//                                           ))
//                                         ) : (
//                                           <SelectItem value="none">
//                                             No Projects Available
//                                           </SelectItem>
//                                         )}
//                                       </SelectContent>
//                                     </Select>
//                                     <Button
//                                       onClick={() =>
//                                         handleAssignProject(
//                                           selectedGroup,
//                                           selectedProject,
//                                         )
//                                       }
//                                     >
//                                       Assign
//                                     </Button>
//                                   </DialogDescription>
//                                 </DialogHeader>
//                               </DialogContent>
//                             </Dialog>
//                           ) : (
//                             <Button
//                               onClick={() =>
//                                 handleRemoveAssignedProject(group.id)
//                               }
//                             >
//                               Remove Project
//                             </Button>
//                           )}
//                         </>
//                       )}
//                       <Button
//                         onClick={() => router.push(`/groups/${group.id}`)}
//                       >
//                         View
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Groups;

// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { PlusCircle } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { createGroup, fetchGroups } from '@/lib/actions/groups.actions';
// import { useRouter } from 'next/navigation';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import { useSession } from 'next-auth/react';
// import {
//   fetchassignedProjects,
//   assignProjectToGroup,
//   fetchProjectsByMaintainerId,
//   removeProjectFromGroup,
// } from '@/lib/actions/projects.action';

// function Groups() {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [groups, setGroups] = useState<any>([]);

//   const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
//   const [selectedProject, setSelectedProject] = useState<string | null>(null);
//   const [projects, setProjects] = useState<any>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
//   const [assignedProjects, setAssignedProjects] = useState<any>([]);
//   const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);
//   console.log(assignedProjects);

//   const router = useRouter();
//   const session = useSession();

//   const handleFetchGroups = async () => {
//     const res = await fetchGroups();
//     setGroups(res);
//   };

//   const fetchProjects = async () => {
//     const maintainerId = session.data?.user.id;
//     if (maintainerId) {
//       const maintainerProjects =
//         await fetchProjectsByMaintainerId(maintainerId);
//       setProjects(maintainerProjects);
//     }
//   };

//   const handleCreateGroup = async () => {
//     if (name && description) {
//       await createGroup(name, description);
//       router.push('/groups');
//     }
//   };

//   const handleAssignProject = async (groupId: string, projectId: string) => {
//     await assignProjectToGroup(groupId, projectId);
//     setIsAssignDialogOpen(false);
//     handleFetchGroups();
//   };

//   const handleRemoveProject = async (groupId: string, projectId: string) => {
//     await removeProjectFromGroup(groupId, projectId);
//     handleFetchGroups();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       if (session.status === 'authenticated') {
//         await handleFetchGroups();
//         await fetchProjects();
//       }
//     };

//     const fetchAssignedProjects = async () => {
//       if (selectedGroup) {
//         const res = await fetchassignedProjects(selectedGroup);
//         console.log(res);
//         setAssignedProjects(res);
//       }
//     };

//     fetchAssignedProjects();
//     fetchData();
//   }, [session.status]);

//   return (
//     <div className="mx-auto flex h-auto max-w-6xl flex-col justify-between">
//       <div className="flex w-full justify-between">
//         <div className="">
//           <h1 className="text-3xl font-medium text-blue-400">Groups</h1>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="flex items-center">
//               <PlusCircle />
//               <p className="ml-2">Add Group</p>
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Create Group</DialogTitle>
//               <DialogDescription className="space-y-4">
//                 <Input
//                   placeholder="Group Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <Input
//                   placeholder="Group Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <Button onClick={handleCreateGroup}>Create</Button>
//               </DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="my-10 grid min-h-[70vh] grid-cols-2 justify-center gap-4">
//         <div className="">
//           {groups.length === 0 ? (
//             <h1>No groups</h1>
//           ) : (
//             <div className="flex h-auto flex-col justify-center gap-2">
//               {groups.map((group: any, index: number) => (
//                 <div
//                   key={index}
//                   className="space-y-2 rounded-lg border px-4 py-2 shadow-md dark:border-white/[0.2] dark:bg-gray-800"
//                 >
//                   <h2 className="text-xl">{group.name}</h2>
//                   <p className="text-sm">{group.description}</p>
//                   <div className="flex items-center justify-between">
//                     <h1 className="text-sm">
//                       created by{' '}
//                       <span className="ml-2 text-muted-foreground">
//                         {group.maintainer.name}
//                       </span>
//                     </h1>
//                     <div className="">
//                       {group.projects.map((project: any) => (
//                         <h1 className="text-sm" key={project.id}>
//                           <p className="text-sm">
//                             Assigned Project :{' '}
//                             <span className="text-blue-400">
//                               {project.name}
//                             </span>
//                           </p>
//                         </h1>
//                       ))}
//                     </div>
//                     <div className="flex space-x-4">
//                       {/* {session.data?.user.id === group.maintainer.id && (
//                         <>
//                           {!group.projects || group.projects.length === 0 ? (
//                             <Dialog
//                               open={isAssignDialogOpen}
//                               onOpenChange={setIsAssignDialogOpen}
//                             >
//                               <DialogTrigger asChild>
//                                 <Button
//                                   onClick={() => {
//                                     setSelectedGroup(group.id);
//                                   }}
//                                 >
//                                   Assign Project
//                                 </Button>
//                               </DialogTrigger>
//                               <DialogContent>
//                                 <DialogHeader>
//                                   <DialogTitle>Assign Project</DialogTitle>
//                                   <DialogDescription className="space-y-4">
//                                     <Select
//                                       value={selectedProject || ''}
//                                       onValueChange={(value) =>
//                                         setSelectedProject(value)
//                                       }
//                                     >
//                                       <SelectTrigger className="w-[380px]">
//                                         <SelectValue placeholder="Select a Project" />
//                                       </SelectTrigger>
//                                       <SelectContent>
//                                         {projects.length > 0 ? (
//                                           projects.map((project: any) => (
//                                             <SelectItem
//                                               key={project.id}
//                                               value={project.id}
//                                             >
//                                               {project.name}
//                                             </SelectItem>
//                                           ))
//                                         ) : (
//                                           <SelectItem value="none">
//                                             No Projects Available
//                                           </SelectItem>
//                                         )}
//                                       </SelectContent>
//                                     </Select>
//                                     <Button onClick={handleAssignProject}>
//                                       Assign
//                                     </Button>
//                                   </DialogDescription>
//                                 </DialogHeader>
//                               </DialogContent>
//                             </Dialog>
//                           ) : (
//                             <Button
//                               onClick={() =>
//                                 handleRemoveProject(group.id, projects[0].id)
//                               }
//                             >
//                               Remove Project
//                             </Button>
//                           )}
//                         </>
//                       )} */}

//                       <div>
//                         <Dialog
//                           onOpenChange={(open) => {
//                             if (!open) setCurrentGroupId(null);
//                           }}
//                         >
//                           {group.assignedProjectId ? (
//                             <div className="space-y-2">
//                               <h1 className="text-base">
//                                 The group assigned is:{' '}
//                                 <span className="text-blue-400">
//                                   {projects.find(
//                                     (project: any) =>
//                                       project.id === group.assignedProjectId,
//                                   )?.name || 'Unknown Group'}
//                                 </span>
//                               </h1>
//                               <Button
//                                 variant="destructive"
//                                 onClick={() =>
//                                   handleRemoveProject(
//                                     group.id,
//                                     group.assignedProjectId,
//                                   )
//                                 }
//                               >
//                                 Remove Group
//                               </Button>
//                             </div>
//                           ) : (
//                             <DialogTrigger asChild>
//                               <Button
//                                 onClick={() =>
//                                   setCurrentGroupId(group.assignedProjectId)
//                                 } // Set the current project ID before opening the dialog
//                               >
//                                 Assign Group
//                               </Button>
//                             </DialogTrigger>
//                           )}
//                           <DialogContent>
//                             <DialogHeader>
//                               <DialogTitle className="text-blue-400">
//                                 Assign A Group to Project
//                               </DialogTitle>
//                             </DialogHeader>
//                             <DialogDescription>
//                               {projects.map((project: any) => {
//                                 const isGroupAssignedToProject =
//                                   group.assignedProjectId === project.id;

//                                 return (
//                                   <div
//                                     key={project.id}
//                                     className="flex items-center justify-between space-y-3"
//                                   >
//                                     <h1 className="text-lg text-foreground">
//                                       {project.name}
//                                     </h1>
//                                     {!isGroupAssignedToProject ? (
//                                       <Button
//                                         variant={'ghost'}
//                                         onClick={() =>
//                                           handleAssignProject(
//                                             group.id,
//                                             project.id,
//                                           )
//                                         }
//                                       >
//                                         Assign
//                                       </Button>
//                                     ) : (
//                                       <p className="text-sm text-muted-foreground">
//                                         Project Already Assigned
//                                       </p>
//                                     )}
//                                   </div>
//                                 );
//                               })}
//                             </DialogDescription>
//                           </DialogContent>
//                         </Dialog>
//                       </div>
//                       <Button
//                         onClick={() => router.push(`/groups/${group.id}`)}
//                       >
//                         View
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Groups;

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
import { useSession } from 'next-auth/react';
import {
  fetchassignedProjects,
  assignProjectToGroup,
  fetchProjectsByMaintainerId,
  removeProjectFromGroup,
} from '@/lib/actions/projects.action';

function Groups() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groups, setGroups] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [projects, setProjects] = useState<any>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assignedProjects, setAssignedProjects] = useState<any>([]);
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null);

  const router = useRouter();
  const session = useSession();

  const handleFetchGroups = async () => {
    const res = await fetchGroups();
    setGroups(res);
  };

  const fetchProjects = async () => {
    const maintainerId = session.data?.user.id;
    if (maintainerId) {
      const maintainerProjects =
        await fetchProjectsByMaintainerId(maintainerId);
      setProjects(maintainerProjects);
    }
  };

  const handleCreateGroup = async () => {
    console.log(name, description);

    if (name && description) {
      await createGroup(name, description);
      handleFetchGroups();
      setIsDialogOpen(false);
    }
  };

  const handleAssignProject = async (groupId: string, projectId: string) => {
    await assignProjectToGroup(groupId, projectId);
    setCurrentGroupId(null);
    handleFetchGroups();
  };

  const handleRemoveProject = async (groupId: string, projectId: string) => {
    await removeProjectFromGroup(groupId, projectId);
    handleFetchGroups();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session.status === 'authenticated') {
        await handleFetchGroups();
        await fetchProjects();
      }
    };

    const fetchAssignedProjects = async () => {
      if (selectedGroup) {
        const res = await fetchassignedProjects(selectedGroup);
        setAssignedProjects(res);
      }
    };

    fetchAssignedProjects();
    fetchData();
  }, [session.status, selectedGroup]);

  return (
    <div className="mx-auto flex h-auto max-w-6xl flex-col justify-between">
      <div className="flex w-full justify-between">
        <div>
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

      <div className="my-10 grid min-h-[70vh] grid-cols-2 justify-center gap-4">
        <div>
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
                      Created by{' '}
                      <span className="ml-2 text-muted-foreground">
                        {group.maintainer.name}
                      </span>
                    </h1>
                    <div>
                      {group.project ? (
                        <div
                          key={group.project.id}
                          className="flex items-center justify-between"
                        >
                          <p className="text-sm">
                            Assigned Project:{' '}
                            <span className="text-blue-400">
                              {group.project.name}
                            </span>
                          </p>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleRemoveProject(group.id, group.project.id)
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm">No assigned projects</p>
                      )}
                    </div>
                    <div className="flex space-x-4">
                      <div>
                        <Dialog
                          onOpenChange={(open) => {
                            if (!open) setCurrentGroupId(null);
                          }}
                        >
                          {/* Only show the assign project button if there are no projects assigned */}
                          {!group.project && (
                            <DialogTrigger asChild>
                              <Button
                                onClick={() => setCurrentGroupId(group.id)}
                              >
                                Assign Project
                              </Button>
                            </DialogTrigger>
                          )}
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-blue-400">
                                Assign A Project to Group
                              </DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              {projects.map((project: any) => (
                                <div
                                  key={project.id}
                                  className="flex items-center justify-between space-y-3"
                                >
                                  <h1 className="text-lg text-foreground">
                                    {project.name}
                                  </h1>
                                  {group.projectId ? (
                                    <p className="text-sm text-muted-foreground">
                                      Project Already Assigned
                                    </p>
                                  ) : (
                                    <Button
                                      variant="ghost"
                                      onClick={() =>
                                        handleAssignProject(
                                          group.id,
                                          project.id,
                                        )
                                      }
                                    >
                                      Assign
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </DialogDescription>
                          </DialogContent>
                        </Dialog>
                      </div>
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
