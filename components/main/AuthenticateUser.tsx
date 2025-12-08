"use client";
import React, { useEffect } from 'react';
import { setCredentials, clearToken } from '@/react_redux/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../reduxComponents/ReduxHook';
import { getme } from '@/react_redux/thunks/UserThunks';

interface AuthenticateUserProps {
  children: React.ReactNode;
}

function AuthenticateUser({ children }: AuthenticateUserProps) {
  const dispatch = useAppDispatch();
  const { token, user, loading, error } = useAppSelector((state) => state.StoreOfUser);
  
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (e.newValue) {
          const newToken = e.newValue;
          
          dispatch(setCredentials({ 
            user: user || { _id: '', email: '', name: '' },
            token: newToken
          }));
          
          if (newToken && !user) {
            dispatch(getme());
          }
        } else {
          dispatch(setCredentials({ 
            user: { _id: '', email: '', name: '' }, 
            token: '' 
          }));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch, user]);

  // Handle getme rejection and clear token
  useEffect(() => {
    if (error && (error.status === 401 || error.status === 403)) {
      dispatch(clearToken());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (token && !user && !loading) {
      dispatch(getme());
    }
  }, [dispatch, token, user, loading]);

  return <>{children}</>;
}

export default AuthenticateUser;