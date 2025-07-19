import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Badge,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    {
      path: "/dashboard",
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/dashboard/supported",
      icon: "fas fa-heart",
      label: "Supported",
      badge: "3",
    },
    {
      path: "/dashboard/my-campaigns",
      icon: "fas fa-bullhorn",
      label: "My Campaigns",
      badge: "2",
    },
    {
      path: "/dashboard/create-campaign",
      icon: "fas fa-plus",
      label: "Create Campaign",
    },
    {
      path: "/dashboard/transactions",
      icon: "fas fa-exchange-alt",
      label: "Transactions",
    },
    {
      path: "/dashboard/settings",
      icon: "fas fa-cog",
      label: "Settings",
    },
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  return (
    <div className="dashboard-wrapper">
      <style>{`
        .dashboard-wrapper {
          min-height: 100vh;
          background: #f8fafc;
        }
        
        .dashboard-navbar {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 0.75rem 0;
          position: sticky;
          top: 0;
          z-index: 1020;
        }
        
        .navbar-brand-custom {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        
        .navbar-brand-custom:hover {
          color: #3b82f6;
        }
        
        .connect-wallet-btn {
          background: #374151;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 14px;
        }
        
        .connect-wallet-btn:hover {
          background: #1f2937;
          transform: translateY(-1px);
        }
        
        .hamburger-btn {
          border: none;
          background: none;
          color: #64748b;
          font-size: 1.25rem;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .hamburger-btn:hover {
          background: #f1f5f9;
          color: #334155;
        }
        
        .search-input {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px 8px 40px;
          font-size: 14px;
          width: 100%;
          max-width: 300px;
          background: #f8fafc;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .search-container {
          position: relative;
          max-width: 300px;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 14px;
        }
        
        .desktop-sidebar {
          background: white;
          border-right: 1px solid #e2e8f0;
          min-height: calc(100vh - 73px);
          padding: 1.5rem 0;
          position: sticky;
          top: 73px;
        }
        
        .sidebar-item {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 14px;
        }
        
        .sidebar-item:hover {
          background: #f8fafc;
          color: #334155;
          text-decoration: none;
        }
        
        .sidebar-item.active {
          background: #eff6ff;
          color: #2563eb;
          border-right: 3px solid #2563eb;
        }
        
        .sidebar-item.active:hover {
          color: #2563eb;
        }
        
        .sidebar-icon {
          width: 18px;
          margin-right: 12px;
          text-align: center;
          font-size: 14px;
        }
        
        .sidebar-badge {
          background: #dc2626;
          color: white;
          border-radius: 10px;
          padding: 2px 6px;
          font-size: 11px;
          font-weight: 600;
          margin-left: auto;
        }
        
        .main-content {
          padding: 2rem;
          background: #f8fafc;
          min-height: calc(100vh - 73px);
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }
        
        .notification-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: white;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .notification-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #374151;
        }
        
        .mobile-sidebar .offcanvas-header {
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 1.5rem;
        }
        
        .mobile-sidebar .offcanvas-body {
          padding: 1rem 0;
        }
        
        .mobile-sidebar .sidebar-item {
          padding: 12px 1.5rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
          }
          
          .search-container {
            display: none;
          }
          
          .desktop-sidebar {
            display: none;
          }
        }
        
        @media (min-width: 769px) {
          .hamburger-btn {
            display: none;
          }
        }
      `}</style>

      {/* Top Navbar */}
      <Navbar className="dashboard-navbar" expand="lg">
        <Container fluid>
          <div className="d-flex align-items-center">
            <button
              className="hamburger-btn d-md-none me-3"
              onClick={handleShowSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
            <Navbar.Brand
              as={Link}
              to="/dashboard"
              className="navbar-brand-custom"
            >
              <i className="fas fa-chart-line me-2"></i>
              United4Change
            </Navbar.Brand>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="search-container d-none d-md-block">
              <input
                type="text"
                className="search-input"
                placeholder="Search campaigns..."
              />
              <i className="fas fa-search search-icon"></i>
            </div>

            <Button className="connect-wallet-btn">
              <i className="fas fa-wallet me-2"></i>
              Connect Wallet
            </Button>

            <button className="notification-btn">
              <i className="fas fa-bell"></i>
            </button>

            <div className="user-avatar">JD</div>
          </div>
        </Container>
      </Navbar>

      <Container fluid className="p-0">
        <Row className="g-0">
          {/* Desktop Sidebar */}
          <Col lg={2} className="d-none d-md-block">
            <div className="desktop-sidebar">
              <Nav className="flex-column">
                {sidebarItems.map((item, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link
                      as={Link}
                      to={item.path}
                      className={`sidebar-item ${
                        isActive(item.path, item.exact) ? "active" : ""
                      }`}
                    >
                      <i className={`${item.icon} sidebar-icon`}></i>
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge className="sidebar-badge">{item.badge}</Badge>
                      )}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
          </Col>

          {/* Main Content */}
          <Col lg={10} md={12}>
            <div className="main-content">{children}</div>
          </Col>
        </Row>
      </Container>

      {/* Mobile Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={handleCloseSidebar}
        placement="start"
        className="mobile-sidebar"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="navbar-brand-custom">
              <i className="fas fa-chart-line me-2"></i>
              United4Change
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {sidebarItems.map((item, index) => (
              <Nav.Item key={index}>
                <Nav.Link
                  as={Link}
                  to={item.path}
                  className={`sidebar-item ${
                    isActive(item.path, item.exact) ? "active" : ""
                  }`}
                  onClick={handleCloseSidebar}
                >
                  <i className={`${item.icon} sidebar-icon`}></i>
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="sidebar-badge">{item.badge}</Badge>
                  )}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DashboardLayout;
