import { CloseOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import React from "react";
import "../../styles/upgradeModal.css";

const UpgradeTierModal = ({ onClose, showLogin }) => {
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
				width: "auto",
			}}
		>
			<div
				className="upgrade-modal-content"
				style={{
					backgroundColor: "white",
					padding: "30px",
					borderRadius: "8px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					top: "10%",
				}}
			>
				<div
					className="upgrade-content"
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<h2
						style={{
							fontWeight: "bold",
							marginBottom: "20px",
							color: "var(--red)",
							textAlign: "center",
						}}
					>
						Important Notice!
					</h2>
					<CloseOutlined onClick={onClose} style={{position:"absolute", right:"10px", top:"10px", fontSize:"18px"}}/>
					<div
						className="important-notice-content"
						style={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							flexDirection: "column",
							gap: "20px",
						}}
					>
						<div
							className="how-to-list-prop"
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								textAlign: "left",
							}}
						>
							<span style={{ fontSize: "18px", fontWeight: "bolder" }}>
								You have two options:
							</span>

							<ol>1. Upload your listing details on our website</ol>
							<ol>
								2. Visit nearest ML Branch and FLA will assist you with listing
								your property.
							</ol>
						</div>
						<div
							className="how-to-upload-prop "
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								alignItems: "flex-start",
								textAlign: "left",
							}}
						>
							<span style={{ fontSize: "18px", fontWeight: "bolder" }}>
								How to upload your listing on our website? 
							</span>

							<ol>1. Download and Install ML Wallet app.</ol>
							<ol>2. Register and ensure your account is fully verified. </ol>
							<ol>
								3. If not, visit the nearest ML Branch to upgrade your account. 
							</ol>
							<ol>
								4. Once approved, scan the QR Code on ML Website to login. 
							</ol>
						</div>
					</div>
				</div>
				<button
				className="signin-button-upgrade"
					onClick={showLogin}
					style={{
						marginTop: "20px",
						padding: "10px 0px",
						backgroundColor: "#D90000",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
						width: "100px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Sign In
				</button>
			</div>
		</div>
	);
};

export default UpgradeTierModal;
