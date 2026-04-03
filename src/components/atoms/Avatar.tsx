type AvatarProps = {
  name: string;
  imageUrl?: string;
};

export default function Avatar({ name, imageUrl }: AvatarProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="h-10 w-10 rounded-full border border-white/20 object-cover shadow-sm"
      />
    );
  }

  const initials = name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-Zcolor15 to-Zcolor12 text-sm font-semibold text-white shadow-sm">
      {initials || 'U'}
    </div>
  );
}
