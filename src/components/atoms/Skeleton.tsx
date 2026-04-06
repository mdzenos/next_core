type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-xl bg-(--progress-track) ${className}`} aria-hidden="true" />;
}
