import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../features/categorySlice"; // ✅ Import deleteCategory
import "../css/DashCategories.css";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading";

const DashboardCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
      setInitialLoad(true);
    } else {
      setInitialLoad(false);
    }
  }, [dispatch, categories.length]);

  // Delete category handler
  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await dispatch(deleteCategory(categoryId)).unwrap(); // ✅ Handle async properly
      } catch (error) {
        alert(`Error deleting category: ${error}`);
      }
    }
  };

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
      <DashboardSidebar />
      <div className="main-content">
        <DashboardNav />
        {loading && initialLoad ? (
          <Loading type="skeleton" count={5} />
        ) : displayedCategories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <>
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
                              onClick={() => handleDelete(category.cat_id)} // ✅ Corrected delete function
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination-container">
                  <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardCategories;
