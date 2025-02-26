import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";

const API_BASE_URL = "https://app.aktivedirectory.com/api";

const ViewEvent = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!event);

  useEffect(() => {
    if (!event) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/getevent/${eventId}`);
          setEvent(response.data.details);
        } catch (error) {
          console.error("Error fetching event details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [event, eventId]);

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="app d-flex">
      <DashboardSidebar />
      <div className="main-content flex-grow-1">
        <DashboardNav />
        <div className="event-details-container container-fluid dashboard-2 p-4">
          <h2>View Event Details</h2>
          <div className="card goal-view shadow-lg">
            <div className="contbox">
              <div className="sprtpagecnt agentfrm">
                <div className="col">
                  <div className="col-md-6">
                    <label className="font-weight-bold">Event Name</label>
                    <p>{event.title}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="font-weight-bold">Description</label>
                    <p>{event.descriptions}</p>
                  </div>
                </div>
                <div className="row">
                <div className="eecol-md-12" style={{ padding: '0px' }}>
                  <label className="font-weight-bold">Images</label>
                    <img
                      src={`../assets/images/${event.image}`}
                      width="150px"
                      alt={event.title}
                      className="event-image"
                    />
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

export default ViewEvent;
