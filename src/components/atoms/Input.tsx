'use client';
import React from 'react';
type Props = React.InputHTMLAttributes<HTMLInputElement>;
export function Input(props: Props) {
  return <input {...props} className={`border rounded px-2 py-1 ${props.className || ''}`} />;
}
