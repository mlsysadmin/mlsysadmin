import { HomeOutlined, RightOutlined } from "@ant-design/icons";

const SubMenu = {
	rent: [
		{
			header: "Homes for rent",
			submenu: [
				{ sub: "House", link: "/rent" },
				{ sub: "Condominium", link: "/condominium" },
				{ sub: "Apartment", link: "/apartment" },
				{ sub: "Townhouse", link: "/townhouse" },
			],
		},
		{
			header: "Commercial for rent",
			submenu: [
				{ sub: "Office Space", link: "/office-space" },
				{ sub: "Retail Spaces", link: "/retail-spaces" },
				{ sub: "Serviced Office", link: "/service-office" },
				{ sub: "Commercial Land/Office", link: "/commercial" },
			],
		},
		{
			header: "Industrial for rent",
			submenu: [{ sub: "Warehouse", link: "/warehouse" }],
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
				{ sub: "House and Lot", link: "/all" },
				{ sub: "Condominium", link: "/condominium" },
				{ sub: "Townhouse", link: "/townhouse" },
				{ sub: "Land/Lot", link: "/lot" },
			],
		},
		{
			header: "Commercial for rent",
			submenu: [
				{ sub: "Office Space", link: "/office-space" },
				{ sub: "Retail Spaces", link: "/retail-space" },
				{ sub: "Serviced Office", link: "/service-office" },
				{ sub: "Commercial Land/Office", link: "/commercial" },
			],
		},
		{
			header: "Leisure Properties for Sale",
			submenu: [
				{ sub: "Hotel/Resort", link: "/hotel-and-resort" },
				{
					childSubMenu: {
						header: "Agricultural for Sale",
						submenu: [{ sub: "Farm Lot", link: "/farm-lot" }],
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
								<a href="/home" className="redirect">
									Home Loan Dashboard <RightOutlined />
								</a>
							</p>
						</div>
					),
					link: "/home",
				},
			],
		},
		{
			header: "Home Loan Guide",
			submenu: [
				{ sub: "Discover Home Loan", link: "/discover-home" },
				{ sub: "Loan Calculator", link: "/loan-calculator" },
			],
		},
		{
			header: "Explore more options",
			submenu: [
				{ sub: "Refinance your home", link: "/home-refinance" },
				{ sub: "Learn more about mortgage process", link: "/mortgage-process" },
				{ sub: "Car Loan", link: "/car-loan" },
				{ sub: "Quick Cash Loan", link: "/quick-cash-loan" },
				{ sub: "Pensioner's Loan", link: "/pension-loan" },
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
								<a href="/home" className="redirect">
									Home Insurance Dashboard <RightOutlined />
								</a>
							</p>
						</div>
					),
					link: "/home",
				},
			],
		},
		{
			header: "Home Insurance Guide",
			submenu: [{ sub: "Insurance Guide", link: "/insurance-guide" }],
		},
		{
			header: "Other  ML Insurance Products ",
			submenu: [
				{ sub: "Personal Accident Insurance", link: "/home-refinance" },
				{ sub: "Auto Insurance", link: "/mortgage-process" },
				{ sub: "Dengue RX Insurance", link: "/car-loan" },
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
						>
							Begin Your Property Search Today with Our Help!
						</a>
					</span>
				</>
			),
			submenu: [
				{sub: "Learn more about our Products and Services"},
				{ sub: "Quick Cash Loans", link: "/house-and-lot" },
				{ sub: "Car Loan", link: "/condominium" },
				{ sub: "Home Loan", link: "/HomeLoan" },
				{ sub: "Kwarta Padala", link: "/HomeLoan" },
			],
		},
		{
			header: "",
			submenu: [
				{ sub: "ML Wallet ", link: "/office-space" },
				{ sub: "ML Payroll Pro", link: "/retail-space" },
				{ sub: "ML Express", link: "/service-office" },
				{ sub: "Money Changer", link: "/commercial" },
			],
		},
		{
			header: "",
			submenu: [
				{ sub: "Jewelry ", link: "/office-space" },
				{ sub: "Insurance", link: "/retail-space" },
				{ sub: "ML Moves", link: "/service-office" },
				{ sub: "Telco, Gaming & TV Loading", link: "/commercial" },
			],
		},
		{
			header: "Online Services",
			submenu: [
				{ sub: "Shop Online", link: "/buyer-guide" },
				{ sub: "Buy Eload", link: "/buyer-guide" },
				{ sub: "Pay Bills", link: "/buyer-guide" },
			],
		},
	],
};

export { SubMenu };
