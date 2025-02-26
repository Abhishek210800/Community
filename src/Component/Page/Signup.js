import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import Nav from '../Nav';
import Footer from '../Footer';


// Reusable Input Field Component
const InputField = ({ label, required, type = "text", ...rest }) => (
  <div className="col-md-6">
    <label>
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input type={type} {...rest} />
  </div>
);

// Reusable Checkbox Group Component
const CheckboxGroup = ({ label, options }) => (
  <div className="col-md-12">
    <label>
      {label}
      <span className="text-red-500">*</span>
    </label>
    <div className="checkrk">
      {options.map((option, index) => (
        <label className="contnr" key={index}>
          {option}
          <input type="checkbox" />
          <span className="checkmk"></span>
        </label>
      ))}
    </div>
  </div>
);

// Reusable Link Button Component
const BackLinkButton = () => (
  <div className="col-md-12">
    <Link to="/" className="lefttpbtn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7"></path>
        <path d="M19 12H5"></path>
      </svg>{" "}
      Back to Directory
    </Link>
  </div>
);

const App = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const categories = [
    "Technology",
    "Healthcare",
    "Entertainment",
    "Marketing",
    "Travel & Hospitality",
    "Real Estate",
    "Computer & IT",
    "Finance",
    "Manufacturing",
    "Others",
  ];

  return (
    <>
    <Nav />
    <div>
      {/* Navbar */}
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img
              className="pb-1"
              src="images/icon.png"
              alt="logo"
              width="30px"
            />{" "}
            Community Directory
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="continner padding-80">
        <div className="row">
          <BackLinkButton />
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="coverbox boxwhitein">
              <div className="headbggrntop">
                <div className="topbd">
                  <h4 className="text-center">Submit Directory or Framework</h4>
                  <p className="text-center margtptty fntclrp">
                    Free submission! Review in approval within 24 hours.
                  </p>
                  <p className="text-center fntclrp">
                    Gain visibility, attract new users, and receive valuable
                    feedback by showcasing your Community.
                  </p>
                </div>
              </div>

              <div className="sucontbox">
                <div className="sprtpagecnt agentfrm">
                  <div className="row">
                    {/* Form Fields */}
                    {[
                      { label: "Community Name", required: true },
                      { label: "Contact Person", required: false },
                      { label: "Address Line 1", required: true },
                      { label: "Address Line 2", required: false },
                      { label: "City", required: true },
                      { label: "State", required: true },
                      { label: "ZIP", required: true },
                      { label: "Country", required: false },
                      { label: "Website", required: true },
                      { label: "Phone", required: true },
                      { label: "Email", required: true },
                      { label: "Title", required: true },
                    ].map(({ label, required }, index) => (
                      <InputField
                        key={index}
                        label={label}
                        required={required}
                      />
                    ))}

                    <div className="col-md-12">
                      <label>
                        Company Description
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea></textarea>
                    </div>

                    <CheckboxGroup
                      label="Select Category"
                      options={categories}
                    />

                    <div className="col-md-12">
                      <label>
                        Add Company Logo<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="form-control nopadfile"
                        type="file"
                        id="formFileReadonly"
                      />
                    </div>

                    {/* Social Links */}
                    {[
                      "Company Facebook Link",
                      "Company LinkedIn Link",
                      "Company Instagram Link",
                      "Company Twitter Link",
                      "Company YouTube Link",
                      "Company Pinterest Link",
                    ].map((label, index) => (
                      <InputField key={index} label={label} />
                    ))}

                    <div className="col-md-12 margtptty margbtmtty">
                      <button className="susbmt">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default App;
