export function TableRow({ children }:{ children: React.ReactNode }) {
  return <tr className="odd:bg-white even:bg-gray-50">{children}</tr>;
}
