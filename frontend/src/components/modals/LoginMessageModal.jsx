import React from "react";
import mllogo from "../../assets/BrokerageLogo.png";
import "../../styles/Card.css";

const LoginMessageModal = ({setShowLoginMessage}) => {
		const handleCloseLoginModal = () => {
			setShowLoginMessage(false);
		};
        const handleLoginButtonClick = () =>{
            window.location.href = "/login";
        }
        
    return (
		<div className="login-message-modal-overlay">
			<div className="login-card-message-modal-content">
				<img src={mllogo} alt="Ml Brokerage Logo"></img>
				<div className="login-message-phrase">
					<h2>Don't Miss Out!</h2>
					<p>
						Log in to save properties and keep track of your favorites
						effortlessly.
					</p>
				</div>

				<div className="buttons-login-message">
					<button id="login-message-btn" onClick={handleLoginButtonClick}>Login</button>
					<button
						id="close-message-btn"
						onClick={() => {
							handleCloseLoginModal()
						}}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginMessageModal;