'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { RootState } from '../../types';
import { AppDispatch } from '../../store/store';
import { ROUTES } from '../../constants';
import { useTheme } from '../../providers/ThemeProvider';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme, toggleTheme } = useTheme();

  // Get current market
  const market = user?.country || '';
  
  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/login');
  };

  return (
    <nav className="bg-[var(--color-primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href={`/${market}`} className="text-xl font-bold">
                Casino Portal
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href={`/${market}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === `/${market}` ? 'bg-[var(--color-accent)] text-white' : 'text-gray-200 hover:bg-[var(--color-secondary)]'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href={`/${market}${ROUTES.CASINO}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === `/${market}${ROUTES.CASINO}` ? 'bg-[var(--color-accent)] text-white' : 'text-gray-200 hover:bg-[var(--color-secondary)]'
                  }`}
                >
                  Casino
                </Link>
                <Link
                  href={`/${market}${ROUTES.PROFILE}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === `/${market}${ROUTES.PROFILE}` ? 'bg-[var(--color-accent)] text-white' : 'text-gray-200 hover:bg-[var(--color-secondary)]'
                  }`}
                >
                  My Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user && (
                <div className="flex items-center">
                  <span className="mr-4">Welcome, {user.firstName}</span>
                  <button
                    onClick={toggleTheme}
                    className="mr-4 p-2 rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-accent)]"
                    aria-label="Toggle theme"
                  >
                    {theme === 'light' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={`/${market}`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${market}` ? 'bg-[var(--color-accent)] text-white' : 'text-gray-200 hover:bg-[var(--color-secondary)]'
              }`}
            >
              Home
            </Link>
            <Link
              href={`/${market}${ROUTES.CASINO}`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${market}${ROUTES.CASINO}` ? 'bg-[var(--color-accent)] text-white' : 'text-gray-200 hover:bg-[var(--color-secondary)]'
              }`}
            >
              Casino
            </Link>
            <Link
              href={`/${market}${ROUTES.PROFILE}`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === `/${market}${ROUTES.PROFILE}` ? 'bg-[var(--color-accent)] text-white' : 'text-gray-200 hover:bg-[var(--color-secondary)]'
              }`}
            >
              My Profile
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {user && (
              <div className="flex items-center px-5">
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white mb-2">
                    {user.firstName} {user.lastName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}