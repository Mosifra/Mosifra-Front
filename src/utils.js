export async function getUserTypeFromCookie() {
  const jwt = getCookie("jwt");
  const headers = new Headers();

  headers.append("Authorization", `Bearer ${jwt}`);

  if (!jwt) return null;

  try {
    const response = await fetch("http://localhost:8000/user/user_type", {
      method: "GET",
      headers: headers,
      redirect: "follow",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const userType = data.user_type;

    return userType;
  } catch (err) {
    console.error("Erreur lors de la vérification de la session :", err);
    clearSessionCookies();
    return null;
  }
}

export async function checkSession() {
  const jwt = getCookie("jwt");
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);

  try {
    const response = await fetch("http://localhost:8000/auth/check_session", {
      method: "GET",
      headers: headers,
      redirect: "follow",
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    if (!data.valid) {
      clearSessionCookies();
      return false;
    }

    return data.valid || false;
  } catch (err) {
    console.error("Erreur lors de la vérification de la session :", err);
    clearSessionCookies();
    return false;
  }
}

export function getCookie(name) {
  const cookies = document.cookie.split("; ").reduce((acc, c) => {
    const [k, v] = c.split("=");
    acc[k] = v;
    return acc;
  }, {});
  return cookies[name] || null;
}

export function clearSessionCookies() {
  const paths = [
    "/",
    "/student",
    "/company",
    "/university",
    "/login",
    "/account",
  ];
  const domains = [window.location.hostname, `.${window.location.hostname}`];

  const names = ["jwt"];

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

export async function getCourseTypes() {
  const jwt = getCookie("jwt");
  const userType = getUserTypeFromCookie(jwt);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  };

  const options = {
    method: "GET",
    headers,
  };

  if (userType == "student") {
    const fetchurl = "http://localhost:8000/user/student/course_type";
  } else if (userType == "university") {
    const fetchurl = "http://localhost:8000/user/university/course_types";
  } else {
    console.log("L'utilisateur n'est pas autorisé à accéder à la route");
  }

  try {
    const response = await fetch(fetchurl, options);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    const data =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    if (data.success) {
      return data.course_type;
    } else {
      console.log("Erreur lors de la récupération de la réponse");
    }
  } catch (error) {
    console.error(error);
  }
}
