import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import "./css/style.css";
// import Nav from "./Nav";
import Main from "./Main";
// import Footer from "./Footer";
import About from "./Page/About";
import Signup from "./Page/Signup";
import SignIn from "./Page/SignIn";
import Event from "./Page/Event";
import Dashboard from "./Page/Dashboard";
import Panalink from "./panalink";
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
  const location = useLocation(); // Hook to get the current location (path)

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever location changes
  }, [location]); // Trigger this effect on location change

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/Ebn" element={<Main />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Event" element={<Event />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Panalink" element={<Panalink />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/DashboardEvent" element={<DashboardEvent />}></Route>
        <Route path="/DashboardCompany" element={<DashboardCompany />}></Route>
        <Route path="/DashboardCategories" element={<DashboardCategories />}></Route>
        <Route path="/EventModal" element={<EventModal />}></Route>
        <Route path="/CompanyModal" element={<CompanyModal />}></Route>
        <Route path="/CategoryModal" element={<CategoryModal />}></Route>
        <Route path="/EditCategory/:eventId" element={<EditCategory />} />
        <Route path="/EditEvent/:eventId" element={<EditEvent />} />
        <Route path="/ViewCategory/:eventId" element={<ViewCategory />} />
        <Route path="/ViewEvent/:eventId" element={<ViewEvent />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/DashboardCategories"
          element={
            <ProtectedRoute>
              <DashboardCategories />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
