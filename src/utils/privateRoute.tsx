
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/login');
    }
  }, [auth, router]);

  if (!auth.isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateRoute;
