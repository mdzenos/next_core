// File path: plop-templates/error.tsx.hbs

'use client';

import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <pre>{error.message}</pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
