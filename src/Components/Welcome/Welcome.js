import React from "react";
import background from "../../assets/image/justice.jpg";
import { Link } from "react-router-dom";

import "./welcome.css";

const Welcome = () => {
  return (
    <div
      className="welcome section__padding"
      id="welcome"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
      }}
    >
      <div className="row welcome--content">
        <div className="welcome--col col-12">
          <p className="p__opensans">
            Best Law Agency, Our Fighting Is For Your Justice
          </p>
          <Link to={localStorage.getItem("token") ? "/lawyers" : "/login"}>
            Get an appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
