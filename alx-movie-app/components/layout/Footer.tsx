npx create-next-app@latest alx-movie-app --typescript --eslint --tailwind

cd alx-movie-app
mkdir -p components/commons components/layouts

components/commons/Button.tsx
import React from 'react';

const Button: React.FC = () => {
  // Base component for reusable buttons
  return (
    <button>Button</button>
  );
};

export default Button;

components/commons/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
  // Base component for displaying loading status
  return (
    <div>Loading...</div>
  );
};

export default Loading;

components/commons/MovieCard.tsx
import React from 'react';

const MovieCard: React.FC = () => {
  // Base component for displaying individual movie summaries
  return (
    <div>Movie Card</div>
  );
};

export default MovieCard;

components/layouts/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  // Base component for the application header/navigation
  return (
    <header>Header</header>
  );
};

export default Header;

components/layouts/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  // Base component for the application footer
  return (
    <footer>Footer</footer>
  );
};

export default Footer;

components/layouts/Layout.tsx
import React, { ReactNode } from 'react';

// Define props to accept children for wrapping content
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Base component that wraps all pages with a Header and Footer
  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;

components/layouts/Button.tsx Note: While Button.tsx is typically only in commons/, it is included here to strictly follow the provided instructions.
import React from 'react';

const Button: React.FC = () => {
  return (
    <button>Layout Button</button>
  );
};

export default Button;

alx-movie-app/
├── components/
├── interfaces/
├── pages/
├── ...
└── package.json  <- HERE!


npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/fontawesome-svg-core

