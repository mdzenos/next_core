import Alert from '@/components/atoms/Alert';

type AuthFormMessageProps = {
  message?: string;
  isError?: boolean;
};

export default function AuthFormMessage({ message, isError = false }: AuthFormMessageProps) {
  return <Alert message={message} variant={isError ? 'error' : 'info'} />;
}
