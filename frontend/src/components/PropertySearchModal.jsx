import React from "react";
import "../styles/PropertySearchModal.css";

const PropertySearchModal = ({ showModal, toggleModal }) => {
	return (
		<div className={`modal ${showModal ? "show" : ""}`} onClick={toggleModal}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<span className="close" onClick={toggleModal}>
					&times;
				</span>
				<h2>Looking for Your Dream Property?</h2>
				<p>
					Let us help you find the perfect place to call home! Whether you’re
					searching for a luxurious estate, commercial lot for your business, or
					industrial lot, our team is dedicated to matching you with the ideal
					property that suits your needs and preferences.
				</p>
				<h3>Why Choose Us?</h3>
				<ul>
					<li>
						Personalized Service: We take the time to understand your unique
						requirements and preferences.
					</li>
					<li>
						Extensive Listings: Access to a wide range of properties, from urban
						centers to serene suburbs.
					</li>
					<li>
						Expert Guidance: Benefit from our experience and knowledge of the
						local real estate market.
					</li>
					<li>
						Streamlined Process: We simplify the search process, saving you time
						and effort.
					</li>
				</ul>
				<h3>How it Works?</h3>
				<ol>
					<li>
						Step 1: Send an Inquiry - Fill out the form below with details about
						your property needs.
					</li>
					<li>
						Step 2: Consultation - One of our property experts will contact you
						for a personalized consultation.
					</li>
					<li>
						Step 3: Property Matching - We’ll present you with a selection of
						properties that match your criteria.
					</li>
					<li>
						Step 4: Visit & Decide - Schedule visits to your favorite properties
						and decide which property you will acquire.
					</li>
				</ol>
				<h3>Ready to Start Your Property Search?</h3>
				<p>
					Don’t hesitate to reach out! Our team is eager to assist you in
					finding the perfect property. Simply fill out the inquiry form, and
					we’ll take it from there.
				</p>
				<form className="property-search-form">
					<input type="text" placeholder="Mobile Number" />
					<input type="email" placeholder="Email Address" />
					<input type="text" placeholder="Last Name" />
					<input type="text" placeholder="First Name" />
					<input type="text" placeholder="Middle Name" />
					<input type="text" placeholder="Suffix" />
					<select>
						<option>Select Property Type</option>
					</select>
					<input type="text" placeholder="Property Details" />
					<input type="text" placeholder="Location Preference" />
					<select>
						<option>Select Budget Range</option>
					</select>
					<input type="number" placeholder="Bedrooms" />
					<input type="number" placeholder="Bathrooms" />
					<input type="text" placeholder="Feature & Amenities" />
					<button type="submit">Submit Application</button>
				</form>
			</div>
		</div>
	);
};

export default PropertySearchModal;
