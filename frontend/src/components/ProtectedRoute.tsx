import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from '../services/authService';

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles = [] }: Props) {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    userRole: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await authService.isAuthenticated();

        if (isAuthenticated) {
          const user = await authService.getCurrentUser();
          const userRole = await authService.getUserRole();

          setAuthState({
            isLoading: false,
            isAuthenticated: true,
            user: user,
            userRole: userRole
          });
        } else {
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
            userRole: null
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState({
          isLoading: false,
          isAuthenticated: false,
          user: null,
          userRole: null
        });
      }
    };

    checkAuth();
  }, [location.pathname]);

  // Loading state
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-[#111F35] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F63049] mb-4"></div>
          <p className="text-white text-xl">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role authorization
  if (allowedRoles.length > 0 && authState.userRole && !allowedRoles.includes(authState.userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized - render children
  return children;
}

export default ProtectedRoute;