import { User } from '../types';
import Cookies from 'js-cookie';

// Set cookie with user data
export const setUserCookie = (user: User) => {
  // The cookie needs to be accessible by middleware, hence using js-cookie
  Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Expires in 7 days
};

// Remove user cookie on logout
export const removeUserCookie = () => {
  Cookies.remove('user');
};

// Get user data from cookie
export const getUserFromCookie = (): User | null => {
  const userCookie = Cookies.get('user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('Failed to parse user cookie', error);
      return null;
    }
  }
  return null;
};