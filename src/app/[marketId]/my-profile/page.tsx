import ProfileClient from '@/app/components/profile/ProfileClient';
import React from 'react';

interface MyProfilePageProps {
  params: {
    marketId: string;
  };
}

// This is a server component, no 'use client' directive
export default function MyProfilePage({ params }: MyProfilePageProps) {
  const { marketId } = params;
  
  return <ProfileClient marketId={marketId} />;
}