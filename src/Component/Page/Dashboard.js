import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../Redux/authSlice";
import axios from "axios";
import categorycom from "../css/assets/images/category-com.jpg";
import "../css/dashboard.css";
import DashboardFooter from "./DashboardFooter";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/signin");
  // };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const tenantId = 1;
    axios
      .get(`/api/getcategory/1?tenant_id=${tenantId}`)
      .then((response) => {
        const data = response.data;
        const categoryArray = data?.details ?? [];
        setCategories(categoryArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [event, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const tenantId = 1;
        const response = await axios.get(
          `/api/getevent/1?tenant_id=${tenantId}`
        );
        setEvents(response.data.details || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <div className="app">
        <DashboardSidebar />

        <div className="main-content">
          <DashboardNav />
          
          <div>
            <div className="companies-text-header">Companies</div>
            <div className="dashboard-row">
              <div className="companies-card">
                <div className="companies-text">Companies</div>
                <div className="total-companies-text">Total Companies</div>
                <div className="progress-circle-container">
                  <svg
                    width="321"
                    height="321"
                    viewBox="0 0 321 321"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="160.5"
                      cy="160.5"
                      r="117.63"
                      stroke="white"
                      strokeWidth="16"
                      fill="transparent"
                    />
                    <circle
                      cx="160.5"
                      cy="160.5"
                      r="117.63"
                      stroke="#5c61f2"
                      strokeWidth="16"
                      strokeDasharray="740"
                      strokeDashoffset="185"
                      strokeLinecap="round"
                      fill="transparent"
                      transform="rotate(-225 160.5 160.5)"
                    />
                    <circle
                      cx="160.5"
                      cy="160.5"
                      r="117.63"
                      stroke="rgba(195, 179, 226, 0.3)"
                      strokeWidth="50"
                      fill="transparent"
                      className="waves"
                    />
                  </svg>
                  <span className="percentage">75%</span>
                </div>
                <div className="card-footer">
                  <div className="footer-item">
                    <h3>
                      <b>259</b>
                    </h3>
                    <p>This Quarter</p>
                  </div>
                  <div className="footer-item">
                    <h3>
                      <b>526</b>
                    </h3>
                    <p>This Year</p>
                  </div>
                </div>
              </div>

              <div className="card o-hidden product-widget">
                <div className="card-header pb-0">
                  <div className="flex justify-between">
                    <div className="flex-grow">
                      <p className="square-after font-bold text-green-600">
                        Events <i className="fa fa-circle"></i>
                      </p>
                      <h4>Events Details</h4>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="activity-timeline">
                    {event.map((Event) => (
                      <div className="d-flex items-start" key={Event.id}>
                        <div className="activity-line"></div>
                        <div className="activity-dot-secondary"></div>
                        <div className="flex-grow">
                          <p className="mt-0 todo-font">
                            <span className="text-blue-600">20-04-2022</span> Today
                          </p>
                          <span className="font-bold">{Event.title}</span>
                          <p className="mb-0">{Event.descriptions}</p>
                        </div>
                        <i className="fa fa-circle circle-dot-secondary pull-right"></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6 col-md-12 box-col-28 xl-28">
                <div className="card o-hidden user-widget">
                  <div className="card-header pb-0">
                    <div className="d-flex justify-content-between">
                      <div className="flex-grow">
                        <p className="square-after f-w-600 header-text-info">
                          Categories<i className="fa fa-circle"> </i>
                        </p>
                        <h4>Category Details</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pb-0 pt-0">
                    <img
                      src={categorycom}
                      width="100%"
                      style={{ marginTop: "30px", marginBottom: "30px" }}
                      alt="Category"
                    />
                  </div>
                  <div className="card-footer">
                    <ul className="radblu">
                      {categories.map((category) => (
                        <li key={category.cat_id}>{category.catName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DashboardFooter />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
