import jwt_decode from "jwt-decode";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      removeToken();
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}
