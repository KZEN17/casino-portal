'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../store/slices/authSlice';
import { RootState } from '../../types';
import { AppDispatch } from '../../store/store';

interface AuthLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthLayout({ children, requireAuth = true }: AuthLayoutProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (requireAuth && !user) {
      // If authentication is required but user is not logged in, redirect to login
      router.push('/login');
    } else if (!requireAuth && user) {
      // If authentication is not required (e.g., login page) but user is logged in,
      // redirect to their market's home page
      router.push(`/${user.country}`);
    }
  }, [user, requireAuth, router]);

  if (requireAuth && !user) {
    // If auth is required but no user, don't render children
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!requireAuth && user) {
    // If auth is not required but user exists, don't render children (redirecting)
    return <div className="flex justify-center items-center h-screen">Redirecting...</div>;
  }

  return <>{children}</>;
}