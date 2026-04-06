import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton, Input } from '@/components/atoms';

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBox({
  value,
  onChange,
  placeholder = 'Tìm kiếm...',
  className = '',
}: SearchBoxProps) {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pl-11 pr-12"
      />

      {value ? (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <IconButton label="Xóa tìm kiếm" onClick={() => onChange('')} className="text-gray-500 hover:bg-Zcolor1">
            <XMarkIcon className="h-4 w-4" />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
}
