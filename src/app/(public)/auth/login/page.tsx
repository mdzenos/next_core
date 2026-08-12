import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <h1>Đăng nhập</h1>
      <p>Trang đăng nhập sẽ dùng Server Action/API thật.</p>
      <Link href="/auth/register">Tạo tài khoản</Link>
    </main>
  );
}
