import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = ({ type = "spinner", count = 5 }) => {
  return (
    <div className="loading-container">
      {type === "spinner" ? (
        <div className="spinner"></div>
      ) : (
        <Skeleton count={count} height={30} className="skeleton-loader" />
      )}
    </div>
  );
};

export default Loading;
