import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Home, Building2, Calendar, Grid } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../css/assets/images/logo/logo.png';
import '../css/SideNav.css';

const SidebarContent = () => {
  const {  toggled, toggleSidebar } = useProSidebar();
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const IconWrapper = ({ children, isActive }) => (
    <div
      style={{
        padding: '6px',
        borderRadius: '4px',
        backgroundColor: isActive ? 'rgb(62, 37, 240)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease'
      }}
    >
      {children}
    </div>
  );

  const menuItemStyles = {
    button: {
      backgroundColor: '#171829',
      color: 'white',
      '&:hover': {
        backgroundColor: '#3B82F6 !important',
        color: 'white',
      },
      transition: 'all 0.3s ease',
      padding: '8px 16px',
      margin: '2px 8px',
      borderRadius: '4px',
    },
    icon: {
      backgroundColor: 'transparent',
    }
  };

  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 9999 }}>
      <Sidebar
  className={`app-sidebar ${toggled ? "sidebar-shown" : ''}`}
  style={{
    height: '100vh',
    border: '1px solid #1f2037',
    backgroundColor: '#171829',
    position: 'relative',
    overflow: 'hidden' // Hides the scrollbar
  }}
  backgroundColor="#171829"
  width="260px"
  toggled={toggled}
  onBackdropClick={() => toggleSidebar(false)}
  breakPoint="lg"
>

        <div
          style={{
            height: '75px',
            padding: '16px',
            borderBottom: '1px solid #1f2037',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#171829'
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem 
            icon={
              <IconWrapper isActive={isActive('/dashboard')}  >
                <Home size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/dashboard" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
           
          >
            Dashboard
          </MenuItem>
          <MenuItem 
            icon={
              <IconWrapper isActive={isActive('/DashboardCompany')}>
                <Building2 size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/DashboardCompany" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
          >
            Companies
          </MenuItem>
          <MenuItem 
            icon={
              <IconWrapper isActive={isActive('/DashboardEvent')}>
                <Calendar size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/DashboardEvent" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
          >
            Events
          </MenuItem>
          <MenuItem 
            icon={
              <IconWrapper isActive={isActive('/DashboardCategories')}>
                <Grid size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/DashboardCategories" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
          >
            Categories
          </MenuItem>
          {/* <MenuItem 
            icon={
              <IconWrapper isActive={isActive('/about')}>
                <BookOpen size={20} color="white" />
              </IconWrapper>
            }
            component={<Link to="/about" />}
            onClick={() => window.innerWidth <= 1190 && toggleSidebar(false)}
          >
            Blog
          </MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarContent;