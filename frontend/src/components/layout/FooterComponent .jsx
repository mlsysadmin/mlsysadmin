import React from "react";
import "../../styles/footer.css";

const FooterComponent = () => {
  return (
    <div className="footerDiv">
      <div className="footerLayout">M. Lhuillier Philippines Inc.</div>
      <div className="footerLayout">
        All Rights Reserved.{" "}
        <img
          className="creative-commons"
          alt="Creative commons"
          src="https://c.animaapp.com/eS0o2HKP/img/creative-commons.svg"
        />
      </div>
    </div>
  );
};

export default FooterComponent;
