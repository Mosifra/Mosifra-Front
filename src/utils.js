export async function getUserTypeFromCookie() {
  const cookies = document.cookie.split("; ").reduce((acc, c) => {
    const [k, v] = c.split("=");
    acc[k] = v;
    return acc;
  }, {});

  const sessionId = cookies.session_id;
  const userType = cookies.user_type;

  if (!sessionId) return null;

  try {
    const response = await fetch("https://localhost:8000/check_session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.valid) {
      clearSessionCookies();
      return null;
    }

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

  const names = ["session_id", "user_type"];

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
