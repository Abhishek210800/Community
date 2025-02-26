import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";
import "../css/CategoryModal.css";

const CategoryModal = () => {
  const [formData, setFormData] = useState({
    catName: "",
    descriptions: "",
    tenant_id: "2",
  });

  const [loading, setLoading] = useState(false); // To handle loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://app.aktivedirectory.com/api/addeditcategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json(); // Parse JSON response
      console.log("API Response:", result); // Log full response

      if (response.ok) {
        alert(result.message || "Category added successfully!");
        setFormData({ catName: "", descriptions: "", tenant_id: "2" });
      } else {
        alert(result.error || "Error adding category.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <DashboardSidebar />
      <div className="flex-grow-1">
        {/* Navbar */}
        <DashboardNav />
        <h3 className="mera">Add Category</h3>

        {/* Modal Content */}
        <div className="container-fluid dashboard-2 p-4">
          <div className="rowview">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card goal-view shadow-lg">
                <div className="contbox">
                  <div className="sprtpagecnt agentfrm">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="font-weight-bold">
                            Category Name<span className="text-black-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="catName"
                            value={formData.catName}
                            onChange={handleChange}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="font-weight-bold">Description</label>
                          <input
                            type="text"
                            name="descriptions"
                            value={formData.descriptions}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                        {loading ? "Saving..." : "Add Category"}
                      </button>
                    </form>
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

export default CategoryModal;
