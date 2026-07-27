'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROLES = ['USER', 'CONCIERGE', 'ADMIN'] as const;
type Role = typeof ROLES[number];

const ROLE_LABELS: Record<Role, string> = {
  USER: 'Kullanıcı',
  CONCIERGE: 'Concierge',
  ADMIN: 'Admin',
};

const ROLE_COLORS: Record<Role, string> = {
  USER: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  CONCIERGE: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  ADMIN: 'bg-green-100 text-green-700 hover:bg-green-200',
};

export default function ChangeRoleButton({ userId, currentRole }: { userId: string; currentRole: Role }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function changeRole(newRole: Role) {
    if (newRole === currentRole) return;
    setLoading(true);
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {ROLES.map((role) => (
        <button
          key={role}
          onClick={() => changeRole(role)}
          disabled={loading}
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors disabled:opacity-50 ${
            role === currentRole
              ? ROLE_COLORS[role] + ' ring-1 ring-current ring-offset-1'
              : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
          }`}
        >
          {ROLE_LABELS[role]}
        </button>
      ))}
    </div>
  );
}
