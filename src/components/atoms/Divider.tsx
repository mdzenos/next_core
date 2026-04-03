import { cn } from '@/utils/cn';

type DividerProps = {
  label?: string;
  className?: string;
};

export default function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <div className={cn('h-px w-full bg-(--divider-color)', className)} />;
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="h-px flex-1 bg-(--divider-color)" />
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-(--text-muted)">{label}</span>
      <div className="h-px flex-1 bg-(--divider-color)" />
    </div>
  );
}
