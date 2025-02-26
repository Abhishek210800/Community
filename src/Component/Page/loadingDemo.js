import React, { useState } from "react";
import Loading from "../loading"; // Adjust the path based on your folder structure

const LoadingDemo = () => {
  const [loadingType, setLoadingType] = useState("spinner");

  return (
    <div className="loadapp">
      {/* <h2>React Loading Component</h2> */}
      <div className="button-container">
        {/* <button onClick={() => setLoadingType("spinner")}>Spinner</button>
        <button onClick={() => setLoadingType("skeleton")}>Skeleton</button> */}
      </div>
      <Loading type={loadingType} count={5} />
    </div>
  );
};

export default LoadingDemo;
