import { useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';
import { getUserTypeFromCookie } from '../utils';

export default function SessionChecker({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    getUserTypeFromCookie();
  }, [pathname]);
  
  return <>{children}</>;
}