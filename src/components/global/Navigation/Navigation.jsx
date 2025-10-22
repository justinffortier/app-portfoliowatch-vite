import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faMoneyBillWave,
  faFileAlt,
  faExchangeAlt,
  faChartLine,
  faUserTie,
  faUser,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-0">
      <Container fluid>
        <Navbar.Brand as={Link} to="/dashboard" className="fw-700">
          Portfolio Watch
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/dashboard"
              active={isActive('/dashboard')}
              className="px-16"
            >
              <FontAwesomeIcon icon={faHome} className="me-8" />
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/clients"
              active={isActive('/clients')}
              className="px-16"
            >
              <FontAwesomeIcon icon={faUsers} className="me-8" />
              Borrowers
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/loans"
              active={isActive('/loans')}
              className="px-16"
            >
              <FontAwesomeIcon icon={faMoneyBillWave} className="me-8" />
              Loans
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/documents"
              active={isActive('/documents')}
              className="px-16"
            >
              <FontAwesomeIcon icon={faFileAlt} className="me-8" />
              Documents
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/transactions"
              active={isActive('/transactions')}
              className="px-16"
            >
              <FontAwesomeIcon icon={faExchangeAlt} className="me-8" />
              Transactions
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reports"
              active={isActive('/reports')}
              className="px-16"
            >
              <FontAwesomeIcon icon={faChartLine} className="me-8" />
              Reports
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/relationship-managers"
              active={isActive('/relationship-managers')}
              className="px-16"
            >
              <FontAwesomeIcon icon={faUserTie} className="me-8" />
              Managers
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={(
                <>
                  <FontAwesomeIcon icon={faUser} className="me-8" />
                  Profile
                </>
              )}
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profile">
                <FontAwesomeIcon icon={faUser} className="me-8" />
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                <FontAwesomeIcon icon={faCog} className="me-8" />
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-8" />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
