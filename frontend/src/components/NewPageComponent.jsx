import React from "react";
import "../styles/newpage.css";
import { useState } from "react";
import { FooterComponent, CustomMlFooter, ListingSearch , MainLayout} from "../components";
import Card from "./custom/cards/Card";
import Pagination from "./custom/pagination/Pagination";
import property from "../images/Guest/property.png";

export const NewPageComponent = () => {
  const prop = property;
  const cardData =[
    {
      title: "3 Bedroom House for Rent in North Town Residences",
      price: "PHP120,000/month",
      imgSrc: prop,
      beds: 3,
      baths: 3,
      size: 250,
      likes: 15,
      forsale: "New",
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
      forsale: "New",
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
      forsale: "New",
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
      forsale: "New",
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
      forsale: "New",
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
      forsale: "New",
      subtitle: "House and Lot for Rent",
    },
  ]

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;


  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

 

  const totalPages = Math.ceil(cardData.length / cardsPerPage);
  return (
    <div className="newpage">
      <MainLayout />
      <div className="newpage-container">
        <div className="newpage-contents">
          <ListingSearch/>
          <div className="second-content">
            <h1>New Properties for Sale/Rent</h1>
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
          <CustomMlFooter />
          <FooterComponent />
        </div>
      </div>
    </div>
  );
};
export default NewPageComponent;