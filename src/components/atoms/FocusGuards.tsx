import type { HTMLAttributes } from 'react';

type FocusGuardsProps = HTMLAttributes<HTMLDivElement>;

export default function FocusGuards(props: FocusGuardsProps) {
  return (
    <>
      <div tabIndex={0} aria-hidden="true" {...props} />
      <div tabIndex={0} aria-hidden="true" {...props} />
    </>
  );
}
