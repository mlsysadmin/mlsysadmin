import { ArrowRightOutlined, HomeOutlined, RightOutlined } from "@ant-design/icons"

const SubMenu = 
    {
        rent: [
            {
                header: "Homes for rent",
                submenu: [
                    { sub: "House" }, { sub: "Condominium" }, { sub: "Apartment" }, { sub: "Townhouse" }
                ]
            },
            {
                header: "Commercial for rent",
                submenu: [
                    { sub: "Office Space" }, { sub: "Retail Spaces" }, 
                    { sub: "Serviced Office" }, { sub: "Commercial Land/Office" }
                ]
            },
            {
                header: "Industrial for rent",
                submenu: [
                    { sub: "Warehouse" }
                ]
            },
            {
                header: "Rental Resources",
                submenu: [
                    { sub: "List my home for rent" }
                ]
            }
        ],

        buy: [
            {
                header: "Homes for sale",
                submenu: [
                    {sub: "House and Lot"}, {sub: "Condominium"},  {sub: "Townhouse"}, {sub: "Land/Lot"}
                ]
            },
            {
                header: "Commercial for rent",
                submenu: [
                    {sub: "Office Space"}, { sub: "Retail Spaces" }, { sub: "Serviced Office" }, { sub: "Commercial Land/Office" }
                ]
            },
            {
                header: "Leisure Properties for Sale",
                submenu: [
                    { sub: "Hotel/Resort" },
                    {
                        childSubMenu: {
                        header: "Agricultural for Sale",
                        submenu: [
                            { sub: "Farm Lot" }
                        ]
                        },
                    }
                ],
                
            },
            {
                header: "Resources",
                submenu: [
                    { sub: "Buyers Guide" }
                ]
            }
        ],
        homeLoan: [
            
            {
                header: <>
                    <HomeOutlined 
                        style={{ fontSize: '18px', color: "black" }}/> 
                    <span 
                    style={{ padding: '0 5px', color: "black", fontSize: '15px' }}>
                        Apply for a home loan
                    </span>
                </>,
                submenu: [
                    {
                        sub_info: <div className="sub-info">
                        <span>
                            Apply for a home loan at <br/> any M Lhuillier Branch <br/> nationwide. You may visit our
                        </span>
                        <p><a href="/home" className="redirect">Home Loan Dashboard <RightOutlined /></a></p>
                        </div>
                    }
                ]
            },
            {
                header: "Home Loan Guid",
                submenu: [
                    {sub: "Discover Home Loan"}, 
                    { sub: "Loan Calculator" }
                ]
            },
            {
                header: "Explore more options",
                submenu: [
                    { sub: "Refinance your home" },
                    { sub: "Learn more about mortgage process" },
                    { sub: "Car Loan" },
                    { sub: "Quick Cash Loan" },
                    { sub: "Pensioner's Loan" },

                ],
                
            },
        ]

    }


export {
    SubMenu
}