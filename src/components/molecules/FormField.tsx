import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  error?: string;
};

export function FormField({ label, children, error }: FormFieldProps) {
  return (
    <div>
      <label>{label}</label>
      {children}
      {error ? <p role="alert">{error}</p> : null}
    </div>
  );
}
