'use client';

import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import AuthLayout from '../components/layout/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-blue-800 font-bold">Casino Portal</h1>
            <p className="text-gray-600 mt-2">Login to access your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
}