import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  if (!accessToken) {
    try {
      const persistedState = localStorage.getItem('persist:root');
      if (persistedState) {
        const parsedState = JSON.parse(persistedState);
        const authState = JSON.parse(parsedState.auth);
        if (authState.accessToken) {
          return children; // ✅ Token exists in persisted state
        }
      }
    } catch (err) {
      console.error("Error reading accessToken from localStorage", err);
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
