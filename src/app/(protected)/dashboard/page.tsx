// src/app/dashboard/page.tsx
export default function DashboardPage() {
  // throw new Error('Test root error boundary');
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">Dashboard Overview</h2>
      <p className="mt-2 text-gray-600">
        Chào mừng bạn đến với hệ thống quản trị social dashboard.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-secondary p-4">
          <p className="text-sm text-gray-600">Users</p>
          <p className="mt-2 text-2xl font-bold text-primary">1,250</p>
        </div>

        <div className="rounded-xl bg-lightBlue p-4">
          <p className="text-sm text-gray-700">Posts</p>
          <p className="mt-2 text-2xl font-bold text-deepBlue2">320</p>
        </div>

        <div className="rounded-xl bg-mediumBlue p-4 text-white">
          <p className="text-sm">Engagement</p>
          <p className="mt-2 text-2xl font-bold">87%</p>
        </div>
      </div>
    </div>
  );
}
