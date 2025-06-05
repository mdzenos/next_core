// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import axiosClient from '@lib/axiosClient';

export default function DashboardPage() {
  const handleTestApi = async () => {
    try {

  const res = await axiosClient.get('/posts');

  console.log(res.status);
    } catch (error) {
      // Error đã được xử lý toast ở interceptor, nên không cần toast ở đây nữa
      console.error('草泥馬:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={handleTestApi}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Test API Call (Trigger Error Toast)
      </button>
    </div>
  );
}
