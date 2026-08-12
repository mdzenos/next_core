import Link from "next/link";

export default function RegisterPage() {
  return (
    <main>
      <h1>Đăng ký</h1>
      <p>Trang đăng ký sẽ kết nối tới User Service.</p>
      <Link href="/auth/login">Đăng nhập</Link>
    </main>
  );
}
