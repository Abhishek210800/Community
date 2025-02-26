import React, { useState } from "react";
// import { useDirectory } from "../ContextApi/DirectoryProvider";
import { Link } from "react-router-dom";

function CompanyList({ company, Data }) {
  // const { directoryData } = useDirectory();
  const [visibleItems, setVisibleItems] = useState(2);

  // Default likes
  const initialLikes = company.reduce((acc, name) => {
    acc[name] = 2; // Set default like value to 2
    return acc;
  }, {});
  const [likes, setLikes] = useState(initialLikes);

  // Sorting state
  const [sortOption, setSortOption] = useState("A-Z");

  // Like button handler
  const handleLike = (companyName) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [companyName]: (prevLikes[companyName] || 2) + 1,
    }));
  };

  // Check if a date is within the last 7 days
  const isWithinLastSevenDays = (date) => {
    const inputDate = new Date(date);
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    return inputDate >= sevenDaysAgo && inputDate <= currentDate;
  };

  // Filtered company data
  const result = company
    .map((item1) => {
      const matchingItem = Data.find((item2) => item2.name === item1);
      return matchingItem;
    })
    .filter((item) => item !== undefined); // Exclude undefined values

  // Sorting logic
  const sortedResult = [...result].sort((a, b) => {
    switch (sortOption) {
      case "Popular":
        return (likes[b.name] || 0) - (likes[a.name] || 0); // Sort by likes
      case "A-Z":
        return a.name.localeCompare(b.name); // Alphabetical
      case "Newest":
        return new Date(b.created_at) - new Date(a.created_at); // Newest first
      case "Newest A-Z":
        if (new Date(a.created_at) === new Date(b.created_at)) {
          return a.name.localeCompare(b.name); // Alphabetical if same date
        }
        return new Date(b.created_at) - new Date(a.created_at); // Newest first
      case "Newest Z-A":
        if (new Date(a.created_at) === new Date(b.created_at)) {
          return b.name.localeCompare(a.name); // Reverse alphabetical if same date
        }
        return new Date(b.created_at) - new Date(a.created_at); // Newest first
      default:
        return 0;
    }
  });

  // Load more items
  const loadMore = () => {
    setVisibleItems((prev) => prev + 2);
  };

  // Handle sorting option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="col-md-9">
      {/* Header Section */}
      <div className="row">
        <div className="col-md-15 text-right">
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                color: "rgb(12, 74, 110)",
                fontSize: "13px",
                float: "left",
                margin: "10px 0 6px 0",
              }}
            >
              Showing ({sortedResult.length})
            </span>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                style={{
                  border: "1px solid rgb(209, 213, 219)",
                  fontSize: "14px",
                }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortOption}
              </button>
              <ul className="dropdown-menu">
                {["Popular", "A-Z", "Newest", "Newest A-Z", "Newest Z-A"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <span
                        className="dropdown-item"
                        onClick={() => handleSortChange(item)}
                      >
                        {item}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Company List Section */}
      <div className="row rolefull">
        {sortedResult.slice(0, visibleItems).map((company, index) => (
          <div className="col-md-6" key={index}>
            <div className="bxdlftbg">
              <img
                src={company.companyLogoURL + company.companyLogo}
                alt={company.name}
              />
              <Link to="/Panalink">
                <h4>{company.name}</h4>
              </Link>
              <p>
                {company.briefDescription
                  ? company.briefDescription.length > 30
                    ? `${company.briefDescription.substring(0, 30)}...`
                    : company.briefDescription
                  : "Description"}
              </p>
              <ul className="rolnum">
                {company.services
                  .split(",")
                  .slice(0, 1)
                  .map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                {company.services.split(",").length > 1 && (
                  <li>Others +{company.services.split(",").length - 2}</li>
                )}
              </ul>
              <span className="lkeicn">
                <i
                  className="fa fa-thumbs-o-up"
                  onClick={() => handleLike(company.name)}
                ></i>{" "}
                {likes[company.name] || 0}
              </span>
              {isWithinLastSevenDays(company.created_at.split(" ")[0]) && (
                <div className="newpstn">NEW</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleItems < sortedResult.length && (
        <div className="text-center marg-10">
          <button onClick={loadMore} className="btnstl">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default CompanyList;
