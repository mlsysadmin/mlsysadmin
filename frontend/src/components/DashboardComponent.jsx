import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Menu, Row, Space, Tag } from "antd";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/dashboard.css";

import RoundBtn from "./custom/buttons/RoundBtn.custom";
import RoundInput from "./custom/inputs/RoundInput.custom";
import RoundSelect from "./custom/selects/RoundSelect.custom";
import CardListingComponent from "./CardListingComponent";
import FeaturedPropertiesComponent from "./FeaturedPropertiesComponent";
import RatingCarouselComponent from "./RatingCarouselComponent";
import SemiRoundBtn from "./custom/buttons/SemiRoundBtn.custom";

import { MockData } from "../utils/ListingMockData";
import CardCategory from "../utils/CardCategoryDashboard.utils";
import FuenteCircle from "../asset/banners/fuente-circle.png";
import AdvanceSearch from "../asset/icons/advanceSearch.png";
import Search from "../asset/icons/Search.png";
import Layout, { Content } from "antd/es/layout/layout";
import MainLayout from "./layout/layout.component";
import { Outlet } from "react-router-dom";

const DashboardComponent = () => {
  const [loading, setLoading] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    console.log(userLikes);
  });

  const tags = [
    {
      key: "all",
      label: "All",
      link: "",
    },
    {
      key: "new",
      label: "New Listing",
      link: "",
    },
    {
      key: "featured",
      label: "Featured",
      link: "",
    },
    {
      key: "for-sale",
      label: "For Sale",
      link: "",
    },
    {
      key: "for-rent",
      label: "For Rent",
      link: "",
    },
    {
      key: "mortgage",
      label: "Mortgage",
      link: "",
    },
  ];

  const Tags = () => (
    <Menu
      className="menu-tags"
      mode="horizontal"
      items={tags}
      selectedKeys={"all"}
    />
  );
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 480,
        min: 315,
      },
      items: 1,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 481,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  const CardCategories = () => {
    return CardCategory.map((item, i) => {
      return (
        <Col key={i}>
          <Card
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="overlay-content">
              <div className="overlay-icon">
                <span>
                  <Image src={item.icon} preview={false} height={30} />
                </span>
              </div>
              <div className="overlay-title">{item.category}</div>
              <div className="overlay-description">{item.decription}</div>
            </div>
          </Card>
        </Col>
      );
    });
  };

  return (
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DashboardComponent;
