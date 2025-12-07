// interfaces/index.ts
import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
}

// components/commons/Button.tsx
import { ButtonProps } from "@/interfaces";
import React from "react";

const Button: React.FC<ButtonProps> = ({ title, action }) => {
  return (
    <button onClick={action} className="px-8 py-2 border-2 border-[#E2D609] rounded-full hover:bg-[#E2D609] hover:text-black transition-colors duration-300">
      {title}
    </button>
  )
}

export default Button;

// components/layouts/Layout.tsx
import { ComponentProps } from "@/interfaces";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout;

// components/layouts/Header.tsx
import Link from "next/link"
import Button from "../commons/Button"
import React from "react"

const Header: React.FC = () => {
  return (
    <header className="h-28 flex items-center bg-[#171D22] px-4 md:px-16 lg:px-44 text-white">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl md:text-4xl font-semibold">Cine<span className="text-[#E2D609]">Seek</span></h2>
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          <Link href="/" className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold">Home</Link>
          <Link href="/movies" className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold">Movies</Link>
          <Link href="/contact" className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold">Contact</Link>
        </nav>
        {/* Buttons now use the 'title' prop */}
        <div className="flex">
          <Button title="Sign in" />
        </div>
      </div>
    </header>

  )
}

export default Header

// components/layouts/Footer.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171D22] text-white py-10 px-6 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        {/* Footer Logo */}
        <h2 className="text-xl md:text-4xl font-semibold mb-4 md:mb-0">
          Cine<span className="text-[#E2D609]">Seek</span>
        </h2>

        <nav className="flex-1 flex justify-center space-x-6 mb-4 md:mb-0">
          <Link href="/" className="hover:text-[#E2D609] text-lg transition-colors duration-300">Home</Link>
          <Link href="/movies" className="hover:text-[#E2D609] text-lg transition-colors duration-300">Movies</Link>
          <Link href="/contact" className="hover:text-[#E2D609] text-lg transition-colors duration-300">Contact</Link>
          <Link href="/privacy" className="hover:text-[#E2D609] text-lg transition-colors duration-300">Privacy Policy</Link>
        </nav>

        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D609]">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D609]">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D609]">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 CineSeek. All rights reserved.</p>
      </div>
    </footer>

  );
};

export default Footer;

// pages/_app.tsx
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

// pages/index.tsx
import Button from "@/components/commons/Button";
import { useRouter } from "next/router";
import React from "react";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-[#171D22] text-white">
      <section
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://themebeyond.com/html/movflx/img/bg/breadcrumb_bg.jpg")',
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Discover Your Next Favorite{" "}
            <span className="text-[#E2D609]">Movie</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl">
            Explore the latest blockbuster movies, critically acclaimed films,
            and your personal favorites – all in one place.
          </p>
          <Button
            title="Browse Movies"
            action={() => router.push("/movies")}
          />
        </div>
      </section>

      <section className="py-16 px-8 md:px-44 bg-[#121018] text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8">
          Join CineSeek Now!
        </h2>
        <p className="text-lg md:text-2xl mb-12">
          Sign up today to get access to the latest movies, exclusive content,
          and personalized movie recommendations.
        </p>
        <Button title="Get Started" action={() => alert("Sign up functionality coming soon!")}/>
      </section>
    </div>
  );
};

export default Home;

Verification
Save and close all modified files.

Run the application from your terminal:
npm run dev
This task successfully establishes the visual and structural foundation of the CineSeek application. By implementing the Layout, Header, and Footer, and wrapping the application in pages/_app.tsx, we ensure a consistent and professional user experience across all pages.

Here are the step-by-step instructions to implement Task 2: Set up Header, Footer, Layout and landing page.

1. Update TypeScript Interfaces (interfaces/index.ts)
Open interfaces/index.ts and replace its content to define the required props for generic components and buttons.

TypeScript

// interfaces/index.ts
import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
}
2. Update Common Component (components/commons/Button.tsx)
Open components/commons/Button.tsx and replace its content to implement the styled button using the new ButtonProps.

TypeScript

// components/commons/Button.tsx
import { ButtonProps } from "@/interfaces";
import React from "react";

const Button: React.FC<ButtonProps> = ({ title, action }) => {
  return (
    <button onClick={action} className="px-8 py-2 border-2 border-[#E2D609] rounded-full hover:bg-[#E2D609] hover:text-black transition-colors duration-300">
      {title}
    </button>
  )
}

export default Button;
3. Create Layout Components (components/layouts/)
A. Layout Component (components/layouts/Layout.tsx)
This component wraps the entire page content, providing the Header and Footer.

TypeScript

// components/layouts/Layout.tsx
import { ComponentProps } from "@/interfaces";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout;
B. Header Component (components/layouts/Header.tsx)
This component provides navigation links and the app logo.

TypeScript

// components/layouts/Header.tsx
import Link from "next/link"
import Button from "../commons/Button"
import React from "react"

const Header: React.FC = () => {
  return (
    <header className="h-28 flex items-center bg-[#171D22] px-4 md:px-16 lg:px-44 text-white">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl md:text-4xl font-semibold">Cine<span className="text-[#E2D609]">Seek</span></h2>
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          <Link href="/" className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold">Home</Link>
          <Link href="/movies" className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold">Movies</Link>
          <Link href="/contact" className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold">Contact</Link>
        </nav>
        {/* Buttons now use the 'title' prop */}
        <div className="flex">
          <Button title="Sign in" />
        </div>
      </div>
    </header>

  )
}

export default Header
C. Footer Component (components/layouts/Footer.tsx)
This component provides links and social media icons (using Font Awesome, which was installed in Task 1).

TypeScript

// components/layouts/Footer.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171D22] text-white py-10 px-6 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center w-full">
        {/* Footer Logo */}
        <h2 className="text-xl md:text-4xl font-semibold mb-4 md:mb-0">
          Cine<span className="text-[#E2D609]">Seek</span>
        </h2>

        <nav className="flex-1 flex justify-center space-x-6 mb-4 md:mb-0">
          <Link href="/" className="hover:text-[#E2D609] text-lg transition-colors duration-300">Home</Link>
          <Link href="/movies" className="hover:text-[#E2D609] text-lg transition-colors duration-300">Movies</Link>
          <Link href="/contact" className="hover:text-[#E2D609] text-lg transition-colors duration-300">Contact</Link>
          <Link href="/privacy" className="hover:text-[#E2D609] text-lg transition-colors duration-300">Privacy Policy</Link>
        </nav>

        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D609]">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D609]">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D609]">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 CineSeek. All rights reserved.</p>
      </div>
    </footer>

  );
};

export default Footer;
4. Setup Global Layout (pages/_app.tsx)
Open pages/_app.tsx and replace its content to wrap the entire application in the Layout component.

TypeScript

// pages/_app.tsx
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
5. Setup Landing Page (pages/index.tsx)
Open pages/index.tsx and replace its content to create the landing page with a hero section and a button that uses next/router for navigation.

TypeScript

// pages/index.tsx
import Button from "@/components/commons/Button";
import { useRouter } from "next/router";
import React from "react";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-[#171D22] text-white">
      <section
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://themebeyond.com/html/movflx/img/bg/breadcrumb_bg.jpg")',
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Discover Your Next Favorite{" "}
            <span className="text-[#E2D609]">Movie</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl">
            Explore the latest blockbuster movies, critically acclaimed films,
            and your personal favorites – all in one place.
          </p>
          <Button
            title="Browse Movies"
            action={() => router.push("/movies")}
          />
        </div>
      </section>

      <section className="py-16 px-8 md:px-44 bg-[#121018] text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8">
          Join CineSeek Now!
        </h2>
        <p className="text-lg md:text-2xl mb-12">
          Sign up today to get access to the latest movies, exclusive content,
          and personalized movie recommendations.
        </p>
        <Button title="Get Started" action={() => alert("Sign up functionality coming soon!")}/>
      </section>
    </div>
  );
};

export default Home;
6. Verification
Save and close all modified files.

Run the application from your terminal:

Bash

npm run dev
Open your browser to http://localhost:3000.

You should see the landing page with the Header, the movie background, the Footer, and the Browse Movies button which is ready to navigate to the /movies page

