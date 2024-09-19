'use client';

import { useEffect, useState } from 'react';

interface ProjectGroup{
    id: string;
    name: string;
    description: string | null;
}

const GroupsPage = () => {
    const [groups, setGroups] = useState<ProjectGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch('/api/groups/maintainer', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch groups');
                }

                const data = await res.json();
                setGroups(data);
            } catch (err) {
                console.error('Error fetching groups:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>My Groups</h1>
            {groups.length === 0 ? (
                <p>You have no groups yet.</p>
            ) : (
                <ul>
                    {groups.map((group) => (
                        <li key={group.id}>
                            <h2>{group.name}</h2>
                            <p>{group.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

