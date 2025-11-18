import jwt_decode from "jwt-decode";

export function isAdminTokenValid() {
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("authToken"); // Hapus token jika kadaluarsa
      return false;
    }

    return true; // Token valid
  } catch (e) {
    localStorage.removeItem("authToken"); // Hapus token jika error
    return false;
  }
}
