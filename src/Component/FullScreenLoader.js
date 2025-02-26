import React from "react";
import { ClipLoader } from "react-spinners"; 

const FullScreenLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.7)", // Dark background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <ClipLoader size={60} color="#fff" />
    </div>
  );
};

export default FullScreenLoader;
