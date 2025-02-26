import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";

const EventModal = ({ onClose }) => {
  const [category] = useState("Agriculture");
  const [eventName, setEventName] = useState("");
  const [details, setDetails] = useState("");
  const [photo, setPhoto] = useState(null);

  // Event Handlers
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setDetails(e.target.value);
  };

  const handleEventImageChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ category, eventName, details, photo });
    onClose();
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <DashboardSidebar />
      <div className="flex-grow-1">
        {/* Navbar */}
        <DashboardNav />
        <h3
          className="company-modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "25px",
            margin: "20px 10px 10px 15px",
            padding: "0 15px",
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Add Event
        </h3>

        {/* Modal Content */}
        <div className="container-fluid dashboard-2">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card goal-view" style={{ padding:"5px"}}>
                <div className="card-body">
                  <div className="contbox" >
                    <div className="sprtpagecnt agentfrm">
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <input
                          type="hidden"
                          name="_token"
                          value="Nyk8QXSIxXPJ6qViKYZgeXtL4wwcEvemJU0bnutf"
                        />
                        <input type="hidden" name="tenant_id" value="2" />

                        <div className="row">
                          <div className="col-md-6">
                            <label>
                              Event Name
                              <span className="text-black-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="title"
                              required
                              value={eventName}
                              onChange={handleEventNameChange}
                            />
                          </div>

                          <div className="col-md-12">
                            <label>Event Description</label>
                            <textarea
                              name="descriptions"
                              rows="8"
                              required
                              value={details}
                              onChange={handleEventDescriptionChange}
                            ></textarea>
                          </div>

                          <div className="col-md-12">
                            <label>Add Event Image</label>
                            <input
                              className="form-control"
                              name="image"
                              type="file"
                              aria-label="file example"
                              required
                              onChange={handleEventImageChange}
                            />
                          </div>

                          <div className="col-md-12 text-center" style={{marginTop:" 10px", marginBottom:"15px"}}>
                            <input
                              type="submit"
                              className="sbmt"
                              value="Add Event"
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
  );
};

export default EventModal;
