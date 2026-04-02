export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

        <h1 className="mt-6 text-2xl font-bold text-primary">Đang tải dữ liệu</h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Vui lòng chờ trong giây lát, hệ thống đang chuẩn bị nội dung cho bạn.
        </p>

        <div className="mt-8 space-y-3">
          <div className="h-4 w-full animate-pulse rounded-lg bg-gray-100" />
          <div className="h-4 w-5/6 animate-pulse rounded-lg bg-gray-100" />
          <div className="h-4 w-4/6 animate-pulse rounded-lg bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
