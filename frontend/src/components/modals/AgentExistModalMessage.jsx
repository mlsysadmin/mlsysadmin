import React from "react";
import mllogo from "../../assets/BrokerageLogo.png";
import "../../styles/Card.css";

const AgentExistModalMessage = ({
	setShowLoginMessage,
	agentRecordStatus,
	resetForm,
}) => {
	const handleCloseLoginModal = () => {
		setShowLoginMessage(false);
		resetForm();
	};
	return (
		<div className="login-message-modal-overlay" style={{ zIndex: 99999 }}>
			<div className="login-card-message-modal-content">
				<img src={mllogo} alt="Ml Brokerage Logo"></img>
				<div className="login-message-phrase">
					{agentRecordStatus === "pending" ? (
						<>
							<span
								style={{
									color: "var(--red)",
									fontWeight: "bold",
									fontSize: "20px",
								}}
							>
								Account Approval in Progress
							</span>
							<br />
							<p style={{ lineHeight: "20px" }}>
								Your account is currently under review. Our team is working to
								verify your details, and we will notify you as soon as your
								account is approved. We appreciate your patience!
							</p>
						</>
					) : (
						<>
							<span
								style={{
									color: "#06402B",
									fontWeight: "bold",
									fontSize: "20px",
								}}
							>
								You’re Already an Agent!
							</span>

							<p style={{ lineHeight: "20px" }}>
								It looks like you’re already registered as an agent. You can now
								manage your properties, connect with clients, and stay on top of
								your listings.
							</p>
						</>
					)}
				</div>

				<div className="buttons-login-message">
					<button
						id="close-message-btn"
						onClick={() => {
							handleCloseLoginModal();
						}}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default AgentExistModalMessage;