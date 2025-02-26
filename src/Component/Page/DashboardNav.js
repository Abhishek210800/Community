import { Menu as MenuIcon, Search, User, UserCircle } from 'lucide-react';
import { useProSidebar } from 'react-pro-sidebar';
import { useState } from 'react';
import '../css/dashboard.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/authSlice";

const DashboardNav = () => {
  const { toggleSidebar } = useProSidebar();
  const [showSearch, setShowSearch] = useState(false); 
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logoutUser());  // Clear Redux state
      localStorage.removeItem("isAuthenticated"); // Double-check clearing localStorage
      localStorage.removeItem("user");
    
      navigate("/signin", { replace: true }); // Redirect to SignIn
      window.location.reload(); // Force reloading the app to reset Redux state
    };
    

  return (
    <div className="navbar2">
      {/* Sidebar Toggle Button */}
      <button 
        className="menu-toggle-btn"
        onClick={() => toggleSidebar(true)}
        aria-label="Toggle Sidebar"
      >
        <MenuIcon size={24} color="white" />
      </button>

      {/* Navigation Actions */}
      <div className="nav-actions">
        {/* Search Input */}
        <div className={`search-container ${showSearch ? 'active' : ''}`}>
          <button 
            className={`icon-button ${showSearch ? 'active' : ''}`}
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle Search"
          >
            <Search size={24} className="search-icon" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className={`search-input ${showSearch ? 'show' : ''}`}
            aria-label="Search"
          />
        </div>
        
        {/* User Profile - Purely CSS-Based Hover Effect */}
        <div className="user-profile-container">
          <button className="icon-button profile-button" aria-label="User Menu">
            <User size={24} className="profile-icon" />
          </button>
          
          {/* Account Menu (CSS Controlled) */}
          <div className="account-menu">
            <div className="account-info">
              <h6>Panalink Infotech Ltd.</h6>
            </div>
            <div className="menu-item">
              <UserCircle size={18} className="menu-icon" />
              <span>Account</span>
            </div>
            <div className="logout-wrapper">
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
