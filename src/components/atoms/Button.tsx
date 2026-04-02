'use client';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded shadow transition"
    >
      {children}
    </button>
  );
}
