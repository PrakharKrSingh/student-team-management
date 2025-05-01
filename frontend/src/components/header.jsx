import { Link, NavLink } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaHome } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <FaUsers style={{ marginRight: '8px' }} />
            Team Maestro
          </Link>
          <div className="nav-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "button" : "button outline"}
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <FaHome /> Home
            </NavLink>
            <NavLink 
              to="/add-member" 
              className={({ isActive }) => isActive ? "button" : "button outline"}
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <FaUserPlus /> Add Member
            </NavLink>
            <NavLink 
              to="/members" 
              className={({ isActive }) => isActive ? "button" : "button outline"}
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <FaUsers /> View Members
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;