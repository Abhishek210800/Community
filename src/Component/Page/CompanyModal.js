import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "../css/CompanyModal.css";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";

const CompanyModal = () => {
  const navigate = useNavigate();
  const tenant_id = 2;
  const [form, setForm] = useState({
    communityName: "",
    contactPerson: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    website: "",
    phone: "",
    email: "",
    title: "",
    description: "",
    category: [],
    companyLogoContents: "",
    companyfacebooklink: "",
    companylinkedinlink: "",
    companyinstagramlink: "",
    companytwitterlink: "",
    companyyoutubelink: "",
    companypinterestlink: ""
  });

  // const categories = [
  //   "AI services",
  //   "Mobile App Development",
  //   "Phone and Utility Service",
  //   "Software Development",
  //   "Website design and maintenance"
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleCheckboxChange = (e) => {
  //   const { value, checked } = e.target;
  //   setForm((prev) => {
  //     const newCategories = checked
  //       ? [...prev.category, value]
  //       : prev.category.filter((cat) => cat !== value);
  //     return { ...prev, category: newCategories };
  //   });
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          companyLogoContents: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      tenant_id,
      company_id: "",
      name: form.communityName,
      contactPerson: form.contactPerson,
      briefDescription: form.title,
      description: form.description,
      address: form.addressLine1 + (form.addressLine2 ? ", " + form.addressLine2 : ""),
      city: form.city,
      state: form.state,
      country: form.country,
      zipCode: form.zip,
      phone: form.phone,
      email: form.email,
      services: form.category.join(", "),
      website: form.website,
      companyLogoContents: form.companyLogoContents,
      facebookUrl: form.companyfacebooklink,
      instagramUrl: form.companyinstagramlink,
      twitterUrl: form.companytwitterlink,
      linkedInUrl: form.companylinkedinlink
    };

    try {
      const response = await axios.post("/api/addeditcompany", payload);
      if (response.data.details?.[0]?.status === 1) {
        alert("Company added successfully.");
        setForm({
          communityName: "",
          contactPerson: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          website: "",
          phone: "",
          email: "",
          title: "",
          description: "",
          category: [],
          companyLogoContents: "",
          companyfacebooklink: "",
          companylinkedinlink: "",
          companyinstagramlink: "",
          companytwitterlink: "",
          companyyoutubelink: "",
          companypinterestlink: ""
        });
        navigate("/Dashcompanies");
      } else {
        alert("Failed to add company. Please try again.");
      }
    } catch (error) {
      console.error("Error adding company:", error.response?.data || error);
      alert("Error adding company. Please try again.");
    }
  };

  return (
    <div className="ac-appc">
      <DashboardSidebar />
      <div className="ac-main-content">
        <DashboardNav />
        <h1 className="ac-form-title-top">Add Company</h1>
        <div className="ac-contbox">
          <form onSubmit={handleSubmit}>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Community Name<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="communityName" value={form.communityName} onChange={handleChange} required />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Contact Person<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="contactPerson" value={form.contactPerson} onChange={handleChange} required />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">
                  Address Line 1<span className="ac-asterisk">*</span>
                </label>
                <input type="text" name="addressLine1" value={form.addressLine1} onChange={handleChange} required />
              </div>
              <div className="ac-col-md-6">
                <label className="ac-labelStyle">Address Line 2</label>
                <input type="text" name="addressLine2" value={form.addressLine2} onChange={handleChange} />
              </div>
            </div>
            <div className="ac-row">
              <div className="ac-col-md-12">
                <label className="ac-labelStyle">
                  Add Company Logo<span className="ac-asterisk">*</span>
                </label>
                <input type="file" className="form-control" onChange={handleFileChange} required />
              </div>
            </div>
            <div className="ac-row ac-btn-row">
              <button className="ac-sbmt" type="submit">Add Company</button>
              <button type="button" className="ac-unique-back-btn" onClick={() => navigate("/Dashcompanies")}>Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
