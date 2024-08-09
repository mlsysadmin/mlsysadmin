import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "../../../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, paginate }) => {
	const pageNumbers = [];

	// Determine which page numbers to show
	const startPage = Math.max(1, currentPage - 1);
	const endPage = Math.min(totalPages, startPage + 2);

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="custom-pagination">
			<span
				onClick={() => paginate(currentPage - 1)}
				className={currentPage > 1 && totalPages > 1 ? "active" : "disabled"}
			>
				<ArrowLeftOutlined />
				Back
			</span>
			<div className="pagination-numbers">
				{pageNumbers.map((number) => (
					<span
						key={number}
						onClick={() => paginate(number)}
						className={currentPage === number ? "active" : ""}
					>
						{number}
					</span>
				))}
			</div>
			<span
				onClick={() => paginate(currentPage + 1)}
				className={
					currentPage < totalPages && totalPages > 1 ? "active" : "disabled"
				}
			>
				Next
				<ArrowRightOutlined />
			</span>
		</div>
	);
};

export default Pagination;
