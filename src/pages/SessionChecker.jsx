import { useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';
import { checkSession } from '../utils';

export default function SessionChecker({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    checkSession();
  }, [pathname]);
  
  return <>{children}</>;
}