import { useState, useEffect } from 'react';

export const useAuthProfile = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // TODO: Add effect logic here
  }, []);

  return {
    state,
    setState,
  };
};
