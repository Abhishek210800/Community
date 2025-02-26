import React from "react";
import {useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";
import "../css/EditCategory.css";

const ViewCategory = () => {
  const location = useLocation();
  console.log(location.state);

  const name=location.state.category.catName;
  const description=location.state.category.descriptions;



  return (
    <div className="d-flex">
      <DashboardSidebar />
      <div className="flex-grow-1">
        <DashboardNav />

        <h3 className="mera">
         View Categories Details</h3>
        <div className="container-fluid dashboard-2 p-4">
          <div className="rowview">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card goal-view shadow-lg">
                <div className="contbox">
                  <div className="sprtpagecnt agentfrm">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="font-weight-bold">Category Name</label>
                        {name}
                      </div>
                      <div className="col-md-6">
                        <label className="font-weight-bold">Description</label>
                        {description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
