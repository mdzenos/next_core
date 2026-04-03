'use client';

import type { ReactNode } from 'react';

type ControllableProps<T> = {
  value?: T;
  defaultValue: T;
  children: (state: {
    value: T;
    setValue: (nextValue: T) => void;
    isControlled: boolean;
  }) => ReactNode;
  onChange?: (value: T) => void;
};

export default function Controllable<T>({ value, defaultValue, children, onChange }: ControllableProps<T>) {
  const isControlled = typeof value !== 'undefined';
  let internalValue = defaultValue;

  const setValue = (nextValue: T) => {
    internalValue = nextValue;
    onChange?.(nextValue);
  };

  return <>{children({ value: isControlled ? (value as T) : internalValue, setValue, isControlled })}</>;
}
