import { Link, useLocation } from 'react-router-dom';
import { UserType } from '../utils/types';

import LogOutBtn from './LogOutBtn';

interface NavbarProps {
  loggedInUser: UserType | null;
  handleLogOut: () => void;
}

const Navbar = ({ loggedInUser, handleLogOut }: NavbarProps) => {
  const { pathname } = useLocation();
  console.log('pathname:', pathname);
  return (
    <nav id="navbar">
      {loggedInUser ? (
        <>
          {pathname === '/' ? (
            <Link className="link nav-link" to="/profile">
              Profile
            </Link>
          ) : (
            <Link className="link nav-link" to="/">
              Home
            </Link>
          )}
          <LogOutBtn handleLogOut={handleLogOut} />
        </>
      ) : (
        <>
          <Link className="link nav-link" to="/register">
            Sign Up
          </Link>
          <Link className="link nav-link" to="/login">
            Log In
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
