type AuthMessageProps = {
  message?: string;
  isError?: boolean;
};

export default function AuthMessage({
  message,
  isError = false,
}: AuthMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm ${
        isError
          ? 'border-red-200 bg-red-50 text-red-600'
          : 'border-Zcolor3 bg-Zcolor1 text-Zcolor13'
      }`}
    >
      {message}
    </div>
  );
}
