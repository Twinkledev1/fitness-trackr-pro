import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <Link to="/">Fitness Trackr</Link>
      <nav>
        <Link to="/activities">Activities</Link>
        <Link to="/routines">Routines</Link>
        {token ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}