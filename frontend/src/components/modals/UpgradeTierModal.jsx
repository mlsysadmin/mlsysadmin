import { Flex } from "antd";
import React from "react";

const UpgradeTierModal = ({ isVisible, onClose }) => {
	return (
		<div
			className="upgrade-tier-modal"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				transition: "opacity 0.3s ease",
				zIndex: 1000,
                width:"100%",
			}}
		>
			<div
				className="modal-content"
				style={{
					backgroundColor: "white",
					padding: "50px 30px",
					borderRadius: "8px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div className="upgrade-content">
					<h2
						style={{
							fontWeight: "bold",
							marginBottom: "20px",
							color: "var(--red)",
						}}
					>
						Upgrade Required!
					</h2>
					<span style={{ fontSize: "17px" }}>
						Please upgrade your ML Wallet Tier to access this feature.
						<br />
						Buyer Tier ⟶ Fully Verified Tier
					</span>
				</div>
				<button
					onClick={onClose}
					style={{
						marginTop: "20px",
						padding: "10px 20px",
						backgroundColor: "#D90000",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
						marginRight: "0px",
					}}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default UpgradeTierModal;
