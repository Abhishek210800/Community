import React from "react";
import Category from "./Category";

function Midmain(props) {
  return (
    <div className="row col-md-12 coverbox search grid-body">
      
        <Category company={props.company}/>
      
    </div>
  );
}

export default Midmain;
