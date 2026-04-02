type AuthMessageProps = {
  message: string;
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
    <p
      className={`text-center text-sm ${
        isError ? 'text-red-600' : 'text-green-600'
      }`}
    >
      {message}
    </p>
  );
}
