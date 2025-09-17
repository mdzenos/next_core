'use client';
import React from 'react';
import { Input } from '@/components/atoms/Input';
export function FormField({ label, name, type='text', defaultValue }:{ label:string; name:string; type?:string; defaultValue?:string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} />
    </div>
  );
}
