import React from "react";
import "../styles/rent.css";
import {
  CameraFilled,
  HeartOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import { Pagination } from "antd";

import TopbarComponent from "./custom/TopbarComponent ";
import rentImg from "../asset/icons/rentImg1.png";
import rentImg1 from "../asset/icons/rentImg2.png";
import rentImg2 from "../asset/icons/rentImg3.png";
import rentImg3 from "../asset/icons/rentImg4.png";
import rentImg4 from "../asset/icons/rentImg5.png";
import rentImg5 from "../asset/icons/rentImg6.png";
import rentImg6 from "../asset/icons/rentImg7.png";
import rentImg7 from "../asset/icons/rentImg8.png";
import rentImg8 from "../asset/icons/rentImg9.png";
import rentImg9 from "../asset/icons/rentImg10.png";
import rentImg10 from "../asset/icons/rentImg11.png";
import rentImg11 from "../asset/icons/rentImg12.png";
import slider from "../asset/icons/slider.png";
import SearchSubCompent from "./custom/SearchSubCompent";
import Card from "./custom/RentComponent";

const RentComponent = () => {
  return (
    <div className="rent">
     <div className="topbar">
     <TopbarComponent />
     </div>
      <SearchSubCompent />
      <div className="rentContainer">
        <div className="rentContent">
          <h1>Properties for Rent</h1>
          <div className="cardContainer">
            <Card
              imageUrl={rentImg}
              label="For Rent"
              numLikes="15"
              title="3 Bedroom House for Rent in North Town Residences"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="200"
            />
            <Card
              imageUrl={rentImg1}
              label="For Rent"
              numLikes="15"
              title="3 Bedroom House for Rent in North Town Residences"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg2}
              label="For Rent"
              numLikes="15"
              title="Furnished 3 Bedroom House for Rent in Talamban"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg3}
              label="For Rent"
              numLikes="20"
              title="3 Bedroom House for Rent in North Town Residences"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg4}
              label="For Rent"
              numLikes="25"
              title="3 Bedroom House for Rent in North Town Residences"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg5}
              label="For Rent"
              numLikes="25"
              title="Furnished 3 Bedroom House for Rent in Talamban"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg6}
              label="For Rent"
              numLikes="15"
              title="3 Bedroom House for Rent in North Town Residences"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg7}
              label="For Rent"
              numLikes="15"
              title="3 Bedroom House for Rent in North Town Residences"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg8}
              label="For Rent"
              numLikes="15"
              title="Furnished 3 Bedroom House for Rent in Talamban"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg9}
              label="For Rent"
              numLikes="15"
              title="3 Bedroom House for Rent in North Town Residences"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg10}
              label="For Rent"
              numLikes="15"
              title="3 Bedroom House for Rent in North Town Residences"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3"
              size="250"
            />
            <Card
              imageUrl={rentImg11}
              label="For Rent"
              numLikes="15"
              title="Furnished 3 Bedroom House for Rent in Talamban"
              subTitle="House and Lot for Rent"
              price="PHP120,000 / month"
              bedrooms="3"
              bathrooms="3" 
              size="250"
            />
          </div>
          {/* <div className="Pagination">
          <Pagination defaultCurrent={1} total={50} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default RentComponent;
