'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { AppDispatch } from '../../store/store';
import { updateUserProfile } from '../../store/slices/authSlice';
import Loader from '../common/Loader';

interface ProfileClientProps {
  marketId: string;
}

export default function ProfileClient({ marketId }: ProfileClientProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  
  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setProfileLoaded(true);
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim()) {
      return;
    }
    
    setIsUpdating(true);
    
    try {
      await dispatch(updateUserProfile({ firstName, lastName }));
      setUpdateSuccess(true);
      
      // Hide success message after a few seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  if (!user || !profileLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="large" text="Loading your profile..." />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 brand-decoration pl-4">My Profile</h1>
      
      <div className="themed-card">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[var(--color-text)] opacity-80">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text)] opacity-80">Market</p>
              <p className="font-medium uppercase">{user.country}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-border)] pt-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          
          {updateSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              Your profile has been updated successfully.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-[var(--color-text)]">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-[var(--color-text)]">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isUpdating}
              className={`themed-button px-6 py-2 ${
                isUpdating ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
        
        <div className="mt-8 border-t border-[var(--color-border)] pt-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Language</h3>
              <select
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                {marketId === 'ca' && <option value="fr_ca">French (Canadian)</option>}
              </select>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    className="mr-2 h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="emailNotifications">Email Notifications</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    className="mr-2 h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="marketingEmails">Marketing Emails</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}