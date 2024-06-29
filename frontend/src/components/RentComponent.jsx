import React from "react";
import "../styles/rent.css";
import { useState } from "react";
import {
  CameraFilled,
  HeartOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import Card from "./custom/cards/Card";
import property from "../images/Guest/property.png";
import Pagination from "./custom/pagination/Pagination";
import { FooterComponent, CustomMlFooter, ListingSearch, MainLayout } from "../components";

const RentComponent = () => {
  const prop = property;
  const cardData = [
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP120,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP80,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "Furnished 3 Bedroom House for Rent in Talamban",
      price: "PHP50,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP120,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP80,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "Furnished 3 Bedroom House for Rent in Talamban",
      price: "PHP50,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP120,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP80,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP120,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP80,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "Furnished 3 Bedroom House for Rent in Talamban",
      price: "PHP50,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    },
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP120,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "For Rent",
      subtitle: "House and Lot for Rent",
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;


  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);


  const totalPages = Math.ceil(cardData.length / cardsPerPage);
  return (
    <div className="rent">
      <MainLayout/>
     <div className="topbar">
     <ListingSearch/>
     </div>
      <div className="rentContainer">
        <div className="rentContent">
          <span className="rent-h1">Properties for Rent</span>
          <div className="card-container">
          {currentCards.map((data, index) => (
            <Card
              key={index}
              title={data.title}
              price={data.price}
              imgSrc={data.imgSrc}
              beds={data.beds}
              baths={data.baths}
              size={data.size}
              likes={data.likes}
              forsale={data.forsale}
              subtitle={data.subtitle}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
        />
      </div>
        <CustomMlFooter/>
        <FooterComponent/>
      </div>
    </div>
  );
}

export default RentComponent;
