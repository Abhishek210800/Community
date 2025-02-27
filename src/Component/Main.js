import React, { useMemo, useState } from "react";
import Midmain from "./Midmain";
import { useDirectory } from "../ContextApi/DirectoryProvider";
import Nav from "./Nav";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

function Main() {
  const { company } = useParams();
  const [member, setMember] = useState("");

  // Fetch directory data from context
  const { directoryData } = useDirectory();

  // Ensure directoryData is available before accessing directoryCompanies
  const companyName = useMemo(() => {
    return directoryData?.directoryCompanies?.map((name) => name.name) || [];
  }, [directoryData]);

  // Optimized filtering logic
  const filteredCompany = useMemo(() => {
    return companyName.filter((item) =>
      item.toLowerCase().includes(member.toLowerCase())
    );
  }, [companyName, member]);

  // Update search input
  const companyFilter = (e) => {
    setMember(e.target.value);
  };

  return (
    <>
      <Nav />
      <div>
        <div className="container padding-80">
          <div className="row">
            <div className="col-md-12 mnhdr">
              <h1>Explore {company} Directory</h1>
              <h2>
                Details of all the products and services offered by group
                members
              </h2>

              <div className="serchdsgn">
                <input
                  type="text"
                  className="form-control"
                  value={member}
                  onChange={companyFilter}
                  placeholder="Search for group member"
                />

                <button type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Midmain company={filteredCompany} />
      <Footer />
    </>
  );
}

export default Main;
