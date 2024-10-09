import React, { useState } from "react";
import "../styles/faqs.css";
import faqs from "../utils/FaqsData";

const FaqsComponent = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleFaq = (index) => {
		if (activeIndex === index) {
			setActiveIndex(null);
		} else {
			setActiveIndex(index);
		}
	};
    const menuQuestions = [
			{
				label: "1. What services does MLhuillier Properties Realty & Brokerage offer?",
				answer:
					"We specialize in selling properties for individuals and corporations, project selling for real estate developers, and offering rental properties.",
			},
			{
				label: "2. How can I list my property with MLhuillier?",
				answer:
					"You can manually upload your listings through our website or visit any of our branches for assistance in maximizing your property's exposure.",
			},
			{
				label: "3. What is the project selling?",
				answer:
					"Project selling involves marketing and selling properties within a development project, benefiting developers by showcasing their projects to potential buyers.",
			},
		];

	return (
		<div className="faqs-container-page">
			<div className="faqs-content-page">
				<h1 className="faq-title">ML Brokerage FAQs</h1>
				<p className="faq-subtitle">Your questions answered here.</p>

				<div className="faq-section">
					<div className="faq-category">
						<ul className="faq-links">
							<li className="faq-link active">General</li>
							<li className="faq-link">Sell</li>
							<li className="faq-link">Buy</li>
							<li className="faq-link">Rent</li>
							<li className="faq-link">Mortgage</li>
							<li className="faq-link">Refinance</li>
						</ul>
					</div>

					<div className="faq-questions">
						{faqs.map((faq, index) => (
							<div className="faq-item" key={index}>
								<div className="faq-question" onClick={() => toggleFaq(index)}>
									<span>{faq.question}</span>
									<span>{activeIndex === index ? "−" : "+"}</span>
								</div>
								{activeIndex === index && (
									<div className="faq-answer">
										<p>{faq.answer}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FaqsComponent;
