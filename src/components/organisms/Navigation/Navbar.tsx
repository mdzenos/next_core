'use client';

import Avatar from '@/components/atoms/Avatar';

export default function Navbar() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-lg font-bold text-Zcolor14">Dashboard</div>
      <div className="flex items-center space-x-3">
        <span className="hidden text-Zcolor12 md:block">Zenos</span>
        <Avatar name="Zenos" imageUrl="/profile.png" />
      </div>
    </div>
  );
}
