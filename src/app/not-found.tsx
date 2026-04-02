import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-2xl">
          404
        </div>

        <h1 className="mt-6 text-2xl font-bold text-primary">
          Không tìm thấy trang
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Trang bạn đang tìm kiếm không tồn tại, đã bị di chuyển hoặc URL không chính xác.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
