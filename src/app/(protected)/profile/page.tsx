import DashboardTemplate from '@/components/templates/DashboardTemplate';

export default function ProfilePage() {
  return (
    <DashboardTemplate>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Trang cá nhân</h2>
        <p className="mt-2 text-gray-600">Thông tin tài khoản của bạn sẽ hiển thị ở đây.</p>
      </div>
    </DashboardTemplate>
  );
}
