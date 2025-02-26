import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categorySlice";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";
import Loading from "../loading";
import "../css/EditCategory.css";

const EditCategory = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { categories, loading } = useSelector((state) => state.categories);
  const [name, setName] = useState(location.state?.category?.catName || "");
  const [description, setDescription] = useState(location.state?.category?.descriptions || "");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
      setInitialLoad(true);
    } else {
      setInitialLoad(false);
      const foundCategory = categories.find((cat) => Number(cat.cat_id) === Number(eventId));
      if (foundCategory) {
        setName(foundCategory.catName || "");
        setDescription(foundCategory.descriptions || "");
      }
    }
  }, [dispatch, categories, eventId]);

  const handleSave = () => {
    // Implement save functionality
    alert("Category is edited successfully.");
    navigate("/Dashcategories");
  };

  if (loading && initialLoad) {
    return (
      <div className="d-flex">
        <DashboardSidebar />
        <div className="flex-grow-1">
          <DashboardNav />
          <Loading type="skeleton" count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <DashboardSidebar />
      <div className="flex-grow-1">
        <DashboardNav />
        <h3 className="mera">Edit Categories</h3>
        <div className="container-fluid dashboard-2 p-4">
          <div className="rowview">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card goal-view shadow-lg">
                <div className="contbox">
                  <div className="sprtpagecnt agentfrm">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="font-weight-bold">Category Name<span className="text-black-500">*</span></label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="font-weight-bold">Description</label>
                        <input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <button onClick={handleSave} className="btn btn-primary mt-3">
                      Edit Category
                    </button>
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

export default EditCategory;
