import { useEffect, useState } from "preact/hooks";
import { Route, useLocation } from "preact-iso";
import { getUserTypeFromCookie } from "../utils.js";

export function ProtectedRouteByType({ component: Component, allowedTypes = [], ...props }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function checkAccess() {
      const userType = await getUserTypeFromCookie();

      if (!userType || !allowedTypes.includes(userType)) {
        location.route("/");
      } else {
        setAuthorized(true);
      }

      setLoading(false);
    }

    checkAccess();
  }, []);

  if (loading) return null;

  if (!authorized) return null;

  return <Route component={Component} {...props} />;
}
