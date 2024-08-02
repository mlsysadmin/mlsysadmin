// import React from "react";
// import { useState } from "react";

// const JoinTeam = ({ toggleModal }) => {
// 	const [showModal, setShowModal] = useState(false);

// 	// const toggleModal = () => {
// 	// 	setShowModal(!showModal);
// 	// };

// 	return (
// 		<div className="join-modal-container">
// 			<div
// 				className="modal-overlay"
// 				role="dialog"
// 				aria-modal="true"
// 				style={{
// 					position: "fixed",
// 					top: "0px",
// 					left: "50%",
// 					transform: "translateX(-50%)",
// 					backgroundColor: "rgba(0, 0, 0, 0.5)",
// 					width: "100%",
// 					height: "100vh",
// 					display: "flex",
// 					justifyContent: "center",
// 					zIndex: 100,
// 					padding: "100px 0px 0px 0px",
// 				}}
// 			>
// 				<div
// 					className="modal-content"
// 					style={{
// 						backgroundColor: "white",
// 						padding: "20px",
// 						borderRadius: "8px",
// 						width: "400px",
// 						height: "200px",
// 						display: "flex",
// 						flexDirection: "column",
// 						justifyContent: "space-between",
// 						alignItems: "center",
// 					}}
// 				>
// 					<h2 style={{ color: "#276638", fontSize: "20px" }}>
// 						Successfully Submitted!
// 					</h2>
// 					<p style={{ fontSize: "12px" }}>
// 						Your mortgage refinance pre-approval is being processed. We
// 						appreciate your patience and will notify you as soon as your
// 						pre-approval is finalized. Thank you!
// 					</p>
// 					<button
// 						onClick={toggleModal}
// 						style={{
// 							backgroundColor: "#276638",
// 							color: "white",
// 							border: "none",
// 							padding: "8px 16px",
// 							borderRadius: "30px",
// 							cursor: "pointer",
// 						}}
// 					>
// 						OK, Noted
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default JoinTeam