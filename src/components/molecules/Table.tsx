export function Table({ children }:{ children: React.ReactNode }) {
  return <table className="min-w-full border-collapse border">{children}</table>;
}
