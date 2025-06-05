// File path: plop-templates/layout.tsx.hbs

import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div>
			<h1 className="text-3xl font-bold">Layout Dashboard</h1>
      {/* TODO: Add header/nav */}
      <main>{children}</main>
      {/* TODO: Add footer */}
    </div>
  );
};

export default Layout;
