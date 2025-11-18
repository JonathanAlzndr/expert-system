// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { isAdminTokenValid } from "../utils/auth"; // Fungsi untuk validasi token

// PrivateRoute hanya menampilkan komponen jika token valid
const PrivateRoute = ({ element, ...rest }) => {
  return isAdminTokenValid() ? (
    element // Render komponen yang diberikan jika token valid
  ) : (
    <Navigate to="/login" /> // Redirect ke login jika token tidak valid
  );
};

export default PrivateRoute;
