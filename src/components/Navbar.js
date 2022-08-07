import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
// hooks
import { useLogout } from '../hooks/useLogout';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontSize: '2em' }}>
          Finance tracker
        </Link>
        <div className="me-2">
          {!user && (
            <>
              <Link
                className="navbar-brand"
                to="/login"
                style={{ fontSize: '1em' }}
              >
                Login
              </Link>
              <Link
                className="navbar-brand"
                to="/signup"
                style={{ fontSize: '1em' }}
              >
                Signup
              </Link>
            </>
          )}
          {user && (
            <>
              <button className="btn btn-outline-success" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
