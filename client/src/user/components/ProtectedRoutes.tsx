import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRoutesProps {
          children: React.ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
          const { state, dispatch } = useAuth();
          const { toast } = useToast();
          const location = useLocation();

          useEffect(() => {
                    const verifyAuth = async () => {
                              dispatch({ type: 'SET_LOADING', payload: true });
                              try {
                                        const response = await fetch('http://localhost:8000/api/auth/verify', {
                                                  credentials: 'include',
                                        });

                                        if (response.ok) {
                                                  const userData = await response.json();
                                                  dispatch({ type: 'LOGIN', payload: userData.user });
                                        } else {
                                                  dispatch({ type: 'LOGOUT' });
                                                  toast({
                                                            title: 'Unauthorized',
                                                            description: 'Please login',
                                                  });
                                        }
                              } catch (error) {
                                        dispatch({ type: 'LOGOUT' });
                              } finally {
                                        dispatch({ type: 'SET_LOADING', payload: false });
                              }
                    };

                    verifyAuth();
          }, [dispatch, toast]);

          if (state.isLoading) {
                    return <div>Loading...</div>;
          }

          if (!state.user) {
                    return <Navigate to="/login" state={{ from: location }} replace />;
          }

          return <>{children}</>;
};

export default ProtectedRoutes;
