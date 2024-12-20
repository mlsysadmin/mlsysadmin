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
		<div className="login-message-modal-overlay">
			<div className="login-card-message-modal-content">
				<img src={mllogo} alt="Ml Brokerage Logo"></img>
				<div className="login-message-phrase">
					{agentRecordStatus === "pending" ? (
						<>
							<h4 style={{ color: "var(--red)" }}>
								Account Approval in Progress
							</h4>
							<br />
							<p>
								Your account is currently under review. Our team is working to
								verify your details, and we will notify you as soon as your
								account is approved. We appreciate your patience!
							</p>
						</>
					) : (
						<>
							<h4 style={{ color: "#06402B" }}>You’re Already an Agent!</h4>
							<br />
							<p>
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