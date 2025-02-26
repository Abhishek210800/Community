import React from "react";
import "../css/card.css"; // Import the CSS file

const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="tag">Companies</span>
      </div>
      <div className="card-body">
        <h2>Total Companies</h2>
        <div className="progress-circle">
          <div className="circle">
            <span className="percentage">75%</span>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="footer-item">
          <h3>259</h3>
          <p>This Quarter</p>
        </div>
        <div className="footer-item">
          <h3>526</h3>
          <p>This Year</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
