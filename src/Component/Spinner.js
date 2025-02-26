import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../features/categorySlice";
import "../css/DashCategories.css";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner"; // Import spinner

const DashboardCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem("visited_dashboard");

    if (!hasVisitedBefore) {
      setShowLoader(true);
      sessionStorage.setItem("visited_dashboard", "true");
    }

    dispatch(fetchCategories());

    // Hide loader after categories are loaded
    setTimeout(() => setShowLoader(false), 1000); // Optional: Smooth delay effect
  }, [dispatch]);

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.catName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / showEntries));
  const startIndex = (currentPage - 1) * showEntries;
  const displayedCategories = filteredCategories.slice(startIndex, startIndex + showEntries);

  return (
    <div className="app">
      {showLoader && <Spinner />} {/* Show loader only on first visit */}
      
      <DashboardSidebar />
      <div className="main-content">
        <DashboardNav />
        <h3 className="mera">
          Categories
          <Link to="/CategoryModal">
            <button className="add-new-btn">+ Add New</button>
          </Link>
        </h3>

        <div className="container2">
          <div className="categories-header-controls">
            <div className="search-and-entries">
              <div className="table-controls">
                <label>
                  Show{" "}
                  <select value={showEntries} onChange={(e) => setShowEntries(Number(e.target.value))}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>{" "}
                  entries
                </label>
              </div>
              <div className="searchCat">
                <label>Search:</label>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : error ? (
            <p>Error: {error}</p>
          ) : displayedCategories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            <div className="table-responsive">
              <table className="categories-table">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedCategories.map((category) => (
                    <tr key={category.cat_id}>
                      <td>{category.catName}</td>
                      <td>{category.descriptions || "N/A"}</td>
                      <td>{category.status ? "Active" : "Inactive"}</td>
                      <td>
                        <div className="action-icons">
                          <Link to={`/EditCategory/${category.cat_id}`} state={{ category }}>
                            <FontAwesomeIcon icon={faEdit} className="action-icon edit-icon" />
                          </Link>
                          <Link to={`/ViewCategory/${category.cat_id}`} state={{ category }}>
                            <FontAwesomeIcon icon={faEye} className="action-icon view-icon" />
                          </Link>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="action-icon delete-icon"
                            onClick={() => dispatch(deleteCategory(category.cat_id))}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination-container">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCategories;
