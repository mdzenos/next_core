type AvatarProps = {
  name: string;
  imageUrl?: string;
};

export default function Avatar({ name, imageUrl }: AvatarProps) {
  if (imageUrl) {
    return <img src={imageUrl} alt={name} className="h-10 w-10 rounded-full object-cover" />;
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">
      {initials}
    </div>
  );
}
