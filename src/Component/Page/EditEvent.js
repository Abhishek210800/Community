import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";

const API_BASE_URL = "https://app.aktivedirectory.com/api";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state?.event || {};

  const [formData, setFormData] = useState({
    title: eventData.title || "Agriculture",
    descriptions:
      eventData.descriptions || "Seminar on Sustainable Agriculture",
    image: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventData.title) {
      fetchEventDetails();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getevent/${id}`);
      setFormData({
        title: response.data.details.title,
        descriptions: response.data.details.descriptions,
        image: null,
      });
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/addeditevent`, {
        tenant_id: 1,
        event_id: id,
        title: formData.title,
        description: formData.descriptions,
        imageName: "",
        imageNameContents: "",
      });
      alert("Event updated successfully");
      navigate("/dashboard-event");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex">
        <DashboardSidebar />
        <div className="flex-grow-1">
          <DashboardNav />
          <div style={{ padding: "20px" }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <DashboardSidebar />
      <div className="flex-grow-1">
        <DashboardNav />
        <h3 className="mera">Edit Event</h3>
        <div className="container-fluid dashboard-2">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card goal-view">
                <div className="card-body" style={{ padding: "0px",margin: "0px 0px 0px 0px " }}>
                  <div className="">
                    <div className="contbox">
                      <div className="sprtpagecnt agentfrm">
                        <form
                          onSubmit={handleSubmit}
                          encType="multipart/form-data"
                        >
                          <div className="row">
                            <div className="col-md-6">
                              <label>
                                Event Name
                                <span className="text-black-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="col-md-12">
                              <label>Event Description</label>
                              <textarea
                                name="descriptions"
                                rows="8"
                                value={formData.descriptions}
                                onChange={handleChange}
                                required
                                style={{ fontWeight: 100 }}
                              ></textarea>
                            </div>

                            <div className="col-md-12">
                              <label>Add Event Image</label>
                              <input
                                className="form-control"
                                name="image"
                                type="file"
                                onChange={handleFileChange}
                                aria-label="file example"
                              />
                            </div>
                            <div className="col-md-12 text-center">
                              <input
                                type="submit"
                                className="sbmt"
                                value="Edit Event"
                                style={{ width: "150px", textAlign: "center" }}
                              />
                            </div>
                          </div>
                        </form>
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

export default EditEvent;
