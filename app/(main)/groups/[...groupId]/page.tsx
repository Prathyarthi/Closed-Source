'use client';

import React, { useEffect, useState } from 'react';
import { addMembersToGroup, getGroupById } from '@/lib/actions/groups.actions'; // Ensure this function fetches group details
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { fetchUsersOfParticularGroup } from '@/lib/actions/user.actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const GroupDetailPage = () => {
  const params = useParams();
  // console.log(params?.groupId[0]);
  const id = params?.groupId[0];
  // console.log(id);

  const [group, setGroup] = useState<any>(null);

  const [users, setUsers] = useState<any>(null);
  // const [members, setMembers] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleGroupMembers = async (groupId: string, userId: string) => {
    console.log(userId);
    console.log(groupId);

    try {
      const member = await addMembersToGroup(groupId, userId);
      // setGroup(member);
      // console.log(member);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getGroupDetails = async () => {
      if (id) {
        try {
          const groupDetails = await getGroupById(id); // Fetch group details
          console.log('Fetched group details:', groupDetails); // Debugging
          setGroup(groupDetails);

          const userList = await fetchUsersOfParticularGroup(id);
          console.log('userList', userList);

          setUsers(userList);
        } catch (err) {
          console.error('Error fetching group details:', err); // Log error for debugging
          setError('Failed to fetch group details.');
        } finally {
          setLoading(false);
        }
      }
    };

    getGroupDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  if (!group) {
    return <div>No group found.</div>; // No group case
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-3xl font-bold text-blue-500">{group.name}</h1>
      <p className="mt-2 text-lg text-gray-700">{group.description}</p>
      <h2 className="text-xl">
        Maintainer{' '}
        <span className="ml-2 text-lg capitalize text-white/80">
          {group.maintainer.name}
        </span>
      </h2>

      <h2 className="mt-6 text-2xl font-semibold">Members</h2>
      <ul className="mt-2 space-y-2">
        {users.length > 0 ? (
          users.map((user: any) => (
            <li key={user.id} className="rounded border p-2 shadow-sm">
              <h3 className="text-lg font-medium">{user.name}</h3>
            </li>
          ))
        ) : (
          <div className="">
            <li>No Members Associated...</li>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <p className="ml-2">Add Members</p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add members to group</DialogTitle>
                  <DialogDescription className="space-y-2">
                    {users.map((user: any) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between"
                      >
                        <div className="">
                          <h1>{user.name}</h1>
                        </div>
                        <div className="">
                          <Button
                            onClick={() =>
                              handleGroupMembers(group.id, user.id)
                            }
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </ul>

      <h2 className="mt-6 text-2xl font-semibold">Associated Projects</h2>
      <ul className="mt-2 space-y-2">
        {group.projects.length > 0 ? (
          group.projects.map((project: any) => (
            <li key={project.id} className="rounded border p-2 shadow-sm">
              <h3 className="text-lg font-medium">{project.name}</h3>
              <p className="text-sm text-gray-500">{project.description}</p>
            </li>
          ))
        ) : (
          <li>No associated projects...</li>
        )}
      </ul>

      <div className="mt-6">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          // onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default GroupDetailPage;
