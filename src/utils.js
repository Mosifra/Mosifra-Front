export function getUserTypeFromCookie() {
  const cookies = document.cookie.split("; ").reduce((acc, c) => {
    const [k, v] = c.split("=");
    acc[k] = v;
    return acc;
  }, {});
  return cookies.sessionId ? cookies.userType : null;
}