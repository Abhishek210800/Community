import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../Redux/loaderSlice"; // Import Redux actions
import "../css/DashboardEvent.css";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNav from "./DashboardNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading";

const API_BASE_URL = "https://app.aktivedirectory.com/api";

const DashboardEvent = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntries, setShowEntries] = useState(10);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);
  const isFirstLoad = useRef(true); // Track first load

  useEffect(() => {
    const fetchEvents = async () => {
      if (!isFirstLoad.current) {
        return; // Don't show loader if not first load
      }

      dispatch(showLoader()); // Show Redux loader
      try {
        const tenantId = 1;
        const response = await axios.get(
          `/api/getevent/1?tenant_id=${tenantId}`
        );
        setEvents(response.data.details || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        dispatch(hideLoader()); // Hide loader
        isFirstLoad.current = false;
      }
    };

    fetchEvents();
  }, [dispatch]);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / showEntries)
  );
  const startIndex = (currentPage - 1) * showEntries;
  const displayedEvents = filteredEvents.slice(
    startIndex,
    startIndex + showEntries
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(showLoader()); // Show loader before deleting
      try {
        await axios.post(`${API_BASE_URL}/deleteevent`, { event_id: id });
        setEvents(events.filter((event) => event.event_id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      } finally {
        dispatch(hideLoader()); // Hide loader after deletion
      }
    }
  };

  return (
    <div className="app">
      <DashboardSidebar />
      <div className="main-content">
        <DashboardNav />
        <h3 className="mera">
          Events
          <Link to="/EventModal">
            <button className="add-new-btn">+ Add New</button>
          </Link>
        </h3>

        <div className="decontainer2">
          <div className="categories-header-controls">
            <div className="search-and-entries">
              <div className="table-controls">
                <label>
                  Show{" "}
                  <select
                    value={showEntries}
                    onChange={(e) => setShowEntries(Number(e.target.value))}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>{" "}
                  entries
                </label>
              </div>
              <div className="searchCat">
                <label>Search:</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <Loading type="skeleton" count={5} />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Event</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedEvents.length > 0 ? (
                  displayedEvents.map((event) => (
                    <tr key={event.event_id}>
                      <td>{event.title}</td>
                      <td>{event.descriptions}</td>
                      <td>
                        <img
                          src={`assets/images/${event.image}`}
                          alt={event.title}
                          className="event-img"
                          style={{ width: "150px" }}
                        />
                      </td>
                      <td style={{ display: "flex", flexDirection: "column" }}>
                        <div className="action-icons">
                          <Link
                            to={`/EditEvent/${event.event_id}`}
                            state={{event }}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="action-icon edit-icon"
                            />
                          </Link>
                          <Link
                            to={`/ViewEvent/${event.event_id}`}
                            state={{ event }}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className="action-icon view-icon"
                            />
                          </Link>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="action-icon delete-icon"
                            onClick={() => handleDelete(event.event_id)} // ✅ Corrected delete function
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No events found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

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
                className={`pagination-button ${
                  currentPage === i + 1 ? "active" : ""
                }`}
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
    </div>
  );
};

export default DashboardEvent;
