//TO FIX HERE AND/OR IN HOME/HEADER
export async function getUserTypeFromCookie() {
  const jwt = getCookie("session_jwt");

  if (!jwt) return null;

  const getUserTypePayload = new URLSearchParams();
  getUserTypePayload.append("jwt", jwt)

  try {
    const response = await fetch("http://localhost:8000/user/get_user_type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: getUserTypePayload.toString(),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.valid) {
      clearSessionCookies();
      return null;
    }

    const userType = response.userType

    return userType || null;
  } catch (err) {
    console.error("Erreur lors de la vérification de la session :", err);
    clearSessionCookies();
    return null;
  }
}

export function getCookie(name) {
  const cookies = document.cookie.split("; ").reduce((acc, c) => {
    const [k, v] = c.split("=")
    acc[k] = v
    return acc
  }, {})
  return cookies[name] || null
}

function clearSessionCookies() {
  const paths = ["/", "/student", "/company", "/university", "/login", "/account"];
  const domains = [window.location.hostname, `.${window.location.hostname}`];

  const names = ["session_jwt"];

  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;

    for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; path=${path};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
    }

    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain};`;
    }
  }
}
