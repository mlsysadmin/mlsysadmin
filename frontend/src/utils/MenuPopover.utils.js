import { HomeOutlined, RightOutlined } from "@ant-design/icons";

const SubMenu = {
	rent: [
		{
			header: "Homes for rent",
			submenu: [
				{ sub: "House", link: "/rent/?property_type=house" },
				{ sub: "Condominium", link: "/rent/?property_type=condominium" },
				{ sub: "Apartment", link: "/rent/?property_type=apartment" },
				{ sub: "Townhouse", link: "/rent/?property_type=townhouse" },
			],
		},
		{
			header: "Commercial for rent",
			submenu: [
				{ sub: "Office Space", link: "/rent/?property_type=office-space" },
				{ sub: "Retail Space", link: "/rent/?property_type=shop/retail" },
				{ sub: "Service Office", link: "/rent/?property_type=service-office" },
				{ sub: "Commercial Land/Office", link: "/rent/?property_type=commercial_land/office" },
			],
		},
		{
			header: "Industrial for rent",
			submenu: [{ sub: "Warehouse", link: "/rent/?property_type=warehouse" }],
		},
		{
			header: "Rental Resources",
			submenu: [{ sub: "List my home for rent", link: "/add-list" }],
		},
	],

	buy: [
		{
			header: "Homes for sale",
			submenu: [
				{ sub: "House and Lot", link: "/sale/?property_type=house-and-lot" },
				{ sub: "Condominium", link: "/sale/?property_type=condominium" },
				{ sub: "Townhouse", link: "/sale/?property_type=townhouse" },
				{ sub: "Land/Lot", link: "/sale/?property_type=lot" },
			],
		},
		{
			header: "Commercial for sale",
			submenu: [
				{ sub: "Office Space", link: "/sale/?property_type=office-space" },
				{ sub: "Retail Spaces", link: "/sale/?property_type=shop/retail" },
				{ sub: "Service Office", link: "/sale/?property_type=service-office" },
				{ sub: "Commercial Land/Office", link: "/sale/?property_type=commercial-land/office" },
			],
		},
		{
			header: "Leisure Properties for Sale",
			submenu: [
				{ sub: "Hotel/Resort", link: "/sale/?property_type=hotel-and-resort" },
				{
					childSubMenu: {
						header: "Agricultural for Sale",
						submenu: [{ sub: "Farm Lot", link: "/sale/?property_type=farm-lot" }],
					},
				},
			],
		},
		{
			header: "Resources",
			submenu: [{ sub: "Buyers Guide", link: "/buyer-guide" }],
		},
	],
	homeLoan: [
		{
			header: (
				<>
					<HomeOutlined style={{ fontSize: "18px", color: "black" }} />
					<span style={{ padding: "0 5px", color: "black", fontSize: "15px" }}>
						Apply for a home loan
					</span>
				</>
			),
			submenu: [
				{
					sub_info: (
						<div className="sub-info">
							<span>
								Apply for a home loan at <br /> any M Lhuillier Branch <br />{" "}
								nationwide. You may visit our
							</span>
							<p>
								<a href="https://mlhuillier.com/home-loan/" className="redirect">
									Home Loan Dashboard <RightOutlined />
								</a>
							</p>
						</div>
					),
					link: "https://mlhuillier.com/home-loan/",
				},
			],
		},
		{
			header: "Home Loan Guide",
			submenu: [
				{ sub: "Discover Home Loan", link: "https://mlhuillier.com/home-loan/" },
				{ sub: "Loan Calculator", link: "/loan-calculator" },
			],
		},
		{
			header: "Explore more options",
			submenu: [
				{ sub: "Refinance your home", link: "/refinance" },
				{ sub: "Learn more about mortgage process", link: "/" },
				{ sub: "Car Loan", link: "https://mlhuillier.com/car-loan" },
				{ sub: "Quick Cash Loan", link: "https://mlhuillier.com/quick-cash-loans" },
				{ sub: "Pensioner's Loan", link: "/" },
			],
		},
	],
	homeInsurance: [
		{
			header: (
				<>
					<HomeOutlined style={{ fontSize: "18px", color: "black" }} />
					<span style={{ padding: "0 5px", color: "black", fontSize: "15px" }}>
						Apply for a home insurance?
					</span>
				</>
			),
			submenu: [
				{
					sub_info_insurance: (
						<div className="sub-info">
							<span>
								Get insured today! Safeguard <br /> your home and property from{" "}
								<br /> a wide range of risks & threats. <br /> You may visit our
							</span>
							<p>
								<a href="https://webinsurance.mlhuillier.com/" className="redirect">
									Home Insurance Dashboard <RightOutlined />
								</a>
							</p>
						</div>
					),
					link: "https://webinsurance.mlhuillier.com/",
				},
			],
		},
		{
			header: "Home Insurance Guide",
			submenu: [{ sub: "Insurance Guide", link: "https://mlhuillier.com/insurance" }],
		},
		{
			header: "Other  ML Insurance Products ",
			submenu: [
				{ sub: "Personal Accident Insurance", link: "https://webinsurance.mlhuillier.com/personal-accident-insurance" },
				{ sub: "Auto Insurance", link: "/mortgage-process" },
				{ sub: "Dengue RX Insurance", link: "https://webinsurance.mlhuillier.com/medical-reimbursement" },
				{ sub: "Medicare Plus Insurance", link: "/quick-cash-loan" },
				{ sub: "Global Travel Protect Insurance", link: "/pension-loan" },
				{ sub: "OFW Balik Manggagawa Insurance", link: "/pension-loan" },
			],
		},
	],
	otherServices: [
		{
			header: (
				<>
					<span>
						<a
							style={{
								color: "var(--red)",
								fontSize: "13px",
								textDecoration: "underline",
							}}
							href="/?openModal=true"
						>
							Begin Your Property Search Today with Our Help!
						</a>
					</span>
					<br />
					<br />
					<span>
						<a
							style={{
								color: "#000000",
								fontSize: "13px",
								fontWeight: "bold",
								margin: "0px 0px 0px 0px",
							}}
						>
							Learn more about our Products and Services
						</a>
					</span>
				</>
			),
			submenu: [
				{ sub: "Quick Cash Loans", link: "https://mlhuillier.com/quick-cash-loans/" },
				{ sub: "Car Loan", link: "https://mlhuillier.com/car-loan/" },
				{ sub: "Home Loan", link: "https://mlhuillier.com/home-loan/" },
				{ sub: "Kwarta Padala", link: "https://mlhuillier.com/kwarta-padala/" },
			],
		},
		{
			header: "",
			submenu: [
				{ sub: "ML Wallet ", link: "https://mlhuillier.com/ml-wallet/" },
				{ sub: "ML Payroll Pro", link: "https://mlhuillier.com/ml-payroll-pro/" },
				{ sub: "ML Express", link: "https://mlhuillier.com/ml-express/" },
				{ sub: "Money Changer", link: "https://mlhuillier.com/money-changer/" },
			],
		},
		{
			header: "",
			submenu: [
				{ sub: "Jewelry ", link: "https://mlhuillier.com/jewelry/" },
				{ sub: "Insurance", link: "https://mlhuillier.com/insurance/" },
				{ sub: "ML Moves", link: "https://mlhuillier.com/ml-moves/" },
				{ sub: "Telco, Gaming & TV Loading", link: "https://mlhuillier.com/telco-gaming-and-tv-loading/" },
			],
		},
		{
			header: "Online Services",
			submenu: [
				{ sub: "Shop Online", link: "https://shop.mlhuillier.com/" },
				{ sub: "Buy Eload", link: "https://mlweb.mlhuillier.com/eload" },
				{ sub: "Pay Bills", link: "https://mlweb.mlhuillier.com/bills-pay" },
			],
		},
	],
};

export { SubMenu };
