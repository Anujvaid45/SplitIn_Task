import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <button className="navbar-toggler" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse">
            <Link to="/" className="navbar-brand">
              SplitIn
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/viewProperty" className="nav-link" activeClassName="active">
                  View Properties
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/addProperty" className="nav-link" activeClassName="active">
                  Add Properties
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
