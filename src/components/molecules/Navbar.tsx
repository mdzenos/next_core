'use client';
import Avatar from '@/components/atoms/Avatar';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="font-bold text-lg">Dashboard</div>
      <div className="flex items-center space-x-3">
        <span className="hidden md:block">Zenos</span>
        <Avatar name="Zenos" imageUrl="/profile.png" />
      </div>
    </div>
  );
}
