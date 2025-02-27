import React, { useEffect } from "react";
import axios from "axios";

function Example() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get("/api/directorydetails/panalink")
          .then((response) => console.log(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
}

export default Example;
