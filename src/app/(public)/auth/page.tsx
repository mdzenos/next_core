import { redirect } from 'next/navigation';
import Link from 'next/link';


export default function AuthPage() {
  // chuyển hướn đến trang login khi truy cập vào /auth
  redirect('/auth/login');
  // return (
  //   <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
  //     <h1 className="text-3xl font-bold text-primary">Xác thực tài khoản</h1>
  //     <p className="mt-3 text-sm leading-6 text-gray-600">
  //       Chọn hành động bạn muốn tiếp tục trong hệ thống.
  //     </p>

  //     <div className="mt-8 flex flex-col gap-4">
  //       <Link
  //         href="/auth/login"
  //         className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
  //       >
  //         Đăng nhập
  //       </Link>

  //       <Link
  //         href="/auth/register"
  //         className="inline-flex items-center justify-center rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
  //       >
  //         Đăng ký
  //       </Link>
  //     </div>
  //   </div>
  // );
}
