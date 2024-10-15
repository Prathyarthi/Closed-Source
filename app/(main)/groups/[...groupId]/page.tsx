'use client';

import React, { useEffect, useState } from 'react';
import { addMembersToGroup, getGroupById } from '@/lib/actions/groups.actions'; // Ensure this function fetches group details
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  fetchUsers,
  fetchUsersOfParticularGroup,
  removeUserFromGroup,
} from '@/lib/actions/user.actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const GroupDetailPage = () => {
  const params = useParams();
  const id = params?.groupId[0];

  const router = useRouter();

  const [group, setGroup] = useState<any>(null);

  const [users, setUsers] = useState<any>(null);
  const [groupUsers, setGroupUsers] = useState<any>(null);
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

  const handleUserDelete = async (groupId: string, userId: string) => {
    try {
      const member = await removeUserFromGroup(groupId, userId);
      // setGroup(member);
      console.log(member);
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

          const groupUsersList = await fetchUsersOfParticularGroup(id);
          console.log('groupUsersList', groupUsersList);

          setGroupUsers(groupUsersList);

          const usersList = await fetchUsers();
          setUsers(usersList);
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
        {groupUsers.length > 0 ? (
          groupUsers.map((user: any) => (
            <div key={user.id} className="rounded border p-3 shadow-sm">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <Button
                  variant={'destructive'}
                  onClick={() => handleUserDelete(group.id, user.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
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
                    {users
                      .filter((user: any) => user.id !== group.maintainer.id)
                      .map((user: any) => (
                        <div
                          key={user.id}
                          className="rounded border p-3 shadow-sm"
                        >
                          <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">
                              {user.name}
                            </h3>
                            <Button
                              variant={'destructive'}
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
        {group.project ? (
          <li key={group.project.id} className="rounded border p-2 shadow-sm">
            <h3 className="text-lg font-medium">{group.project.name}</h3>
            <p className="text-sm text-gray-500">{group.project.description}</p>
          </li>
        ) : (
          <li>No associated projects...</li>
        )}
      </ul>

      <div className="mt-6">
        <Button variant={'secondary'} onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default GroupDetailPage;
