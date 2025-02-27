import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";
import Main from "./Main";
import About from "./Page/About";
import Signup from "./Page/Signup";
import SignIn from "./Page/SignIn";
import Event from "./Page/Event";
import Dashboard from "./Page/Dashboard";
import DashboardEvent from "./Page/DashboardEvent";
import DashboardCompany from "./Page/DashboardCompany";
import DashboardCategories from "./Page/DashboardCategories";
import EventModal from "./Page/EventModal";
import CompanyModal from "./Page/CompanyModal";
import CategoryModal from "./Page/CategoryModal";
import ViewCategory from "./Page/ViewCategory";
import EditCategory from "./Page/EditCategory";
import EditEvent from "./Page/EditEvent";
import ViewEvent from "./Page/ViewEvent";
import ProtectedRoute from "./ProtectedRoute";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/directory/:company" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/event" element={<Event />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard-event" element={<ProtectedRoute><DashboardEvent /></ProtectedRoute>} />
      <Route path="/dashboard-company" element={<ProtectedRoute><DashboardCompany /></ProtectedRoute>} />
      <Route path="/dashboard-categories" element={<ProtectedRoute><DashboardCategories /></ProtectedRoute>} />
      
      <Route path="/event-modal" element={<EventModal />} />
      <Route path="/company-modal" element={<CompanyModal />} />
      <Route path="/category-modal" element={<CategoryModal />} />
      
      <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      <Route path="/edit-event/:eventId" element={<EditEvent />} />
      <Route path="/view-category/:categoryId" element={<ViewCategory />} />
      <Route path="/view-event/:eventId" element={<ViewEvent />} />
    </Routes>
  );
};

export default Home;
