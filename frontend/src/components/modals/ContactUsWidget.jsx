import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Input, Button , notification} from "antd";
import TextArea from "antd/es/input/TextArea";
import { SendEmailInquiry } from "../../api/Public/Email.api";
import "../../styles/widget.css";

const ContactUsWidget = ({closeWidgetCalc}) => {
	const [btnLoading, setBtnLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const openNotificationWithIcon = (type, message, description) => {
		api[type]({
			message: message,
			description: description,
			placement: "bottomRight",
			duration: type == "error" ? 10 : 10,
		});
	};
	const HandleContactClick = async () => {
		try {
			const values = Object.values(contact);
			const keys = Object.keys(contact);
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

			if (values.includes("")) {
				openNotificationWithIcon(
					"warning",
					`Required Field`,
					"Please fill in required fields."
				);
			} else if (
				keys.filter((key) => key == "email" && !emailRegex.test(contact[key]))
					.length !== 0
			) {
				openNotificationWithIcon(
					"warning",
					`Invalid Value`,
					"Please provide a valid email address."
				);
			} else {
				setBtnLoading(true);
				const sendEmailMessage = await SendEmailInquiry(contact);
				if (Object.keys(sendEmailMessage).length == 0) {
					throw new Error("error while sending a message");
				}
				openNotificationWithIcon(
					"success",
					`Message Sent`,
					"Your message has been sent."
				);
				setContact({
					name: "",
					email: "",
					message: "",
					phone: "",
				});
				setBtnLoading(false);
			}
		} catch (error) {
			openNotificationWithIcon(
				"error",
				"Message Failed",
				`We're sorry, but your message couldn't be sent. We're already working on resolving the issue. 
            Please try again later, or for immediate assistance, contact us at properties@mlhuillier.com or 380 300, local 11569.
            Thank you for your patience!`
			);
		}

		// window.location.href = "https://www.google.com/maps/place/capoocan+Leyte"
	};

	const HandleContactChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	return (
		<>
			{contextHolder}
			<div
				className="contact-us-widget"
				style={{
					position: "fixed",
					bottom: "20px",
					right: "100px",
					width: "300px",
					backgroundColor: "#fff",
					borderRadius: "8px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					padding: "20px",
					zIndex: 1050,
					overflow: "hidden",
				}}
			>
				<CloseOutlined
					onClick={closeWidgetCalc}
					style={{
						position: "absolute",
						top: "10px",
						right: "10px",
						fontSize: "12px",
						cursor: "pointer",
					}}
				/>
				<span style={{ fontSize: "14px !important", fontWeight: "bold" }}>
					Message Us
				</span>
				<div className="contact-us-widget-form">
					<div className="contact-us-widget-container">
						<div className="contact-us-form">
						
								<div className="contact--form-group-control">
									<div className="contact--form-control">
										<Input
											type="text"
											placeholder="Name"
											className="contact__form-control"
											onChange={(e) => HandleContactChange(e)}
											value={contact.name}
											name="name"
										/>
									</div>
									<div className="contact--form-control">
										<Input
											type="text"
											placeholder="Email Address"
											className="contact__form-control"
											onChange={(e) => HandleContactChange(e)}
											value={contact.email}
											name="email"
										/>
									</div>
									<div className="contact--form-control">
										<Input
											type="text"
											placeholder="Phone Number"
											className="contact__form-control"
											onChange={(e) => HandleContactChange(e)}
											value={contact.phone}
											name="phone"
											maxLength={11}
											onKeyDown={(e) => {
												const currentLength = contact.phone.length;
												if (e.key === "Backspace" || e.key === "Delete") {
													return;
												}
												if (!/\d/.test(e.key)) {
													e.preventDefault();
												}
												if (currentLength === 0 && e.key !== "0") {
													e.preventDefault();
												}
												if (currentLength === 1 && e.key !== "9") {
													e.preventDefault();
												}
											}}
										/>
									</div>
								</div>
								<div className="contact--form-control">
									<TextArea
										placeholder={`I am interested in `}
										className="contact__form-control"
										rows={4}
										onChange={(e) => HandleContactChange(e)}
										value={contact.message}
										name="message"
									/>
								</div>
								<Button
									className="btn-send"
									onClick={HandleContactClick}
									loading={btnLoading}
								>
									Send Message
								</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default ContactUsWidget;
