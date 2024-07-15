import React from 'react';
import "../styles/listing-form.css";

const DescriptionDetailsComponent = () => {
  return (
    <div className="descriptionDetails">
      <h1>Description</h1>
      <div className="descriptionText">
        <div className="titleText">
          <h2 className="title">Title</h2>
          <input type="text" placeholder="input title" />
          <p className="example">
            If there are important details that we weren't able to ask, you can specify it here.
            <br /> 
            Please note: links and contact info entered will be removed.
          </p>
        </div>
        <div className="descriptionContent">
          <textarea
            name=""
            id=""
            placeholder="Description of the place.."
          ></textarea>
          <p className="example">
            Here's a nice, simple and concise example:
          </p>
          <br />
          <p className="example">
            This semi-furnished unit for sale in Quezon City is an ideal space
            for young professionals or starting families. The Project is near
            Araneta Center, Ali Mall Shopping Complex, MRT, LRT, and EDSA.
            Residents will also have access to condominium amenities like a
            swimming pool, a gym, a playground, a basketball court, and a
            function room.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionDetailsComponent;
