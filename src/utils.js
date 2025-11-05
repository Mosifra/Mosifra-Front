export function getUserTypeFromCookie() {
  const cookies = document.cookie.split("; ").reduce((acc, c) => {
    const [k, v] = c.split("=");
    acc[k] = v;
    return acc;
  }, {});
  return cookies.session_id ? cookies.user_type : null;
}
