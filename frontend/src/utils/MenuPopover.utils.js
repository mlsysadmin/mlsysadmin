import { ArrowRightOutlined, HomeOutlined, RightOutlined } from "@ant-design/icons"

const SubMenu = 
    {
        rent: [
            {
                header: "Homes for rent",
                submenu: [
                    { sub: "House", link: '/house' }, 
                    { sub: "Condominium", link: '/condominium' }, 
                    { sub: "Apartment", link: '/apartment' }, 
                    { sub: "Townhouse", link: '/townhouse' }
                ]
            },
            {
                header: "Commercial for rent",
                submenu: [
                    { sub: "Office Space", link: '/office-space' }, 
                    { sub: "Retail Spaces", link: '/retail-spaces' }, 
                    { sub: "Serviced Office", link: '/service-office' }, 
                    { sub: "Commercial Land/Office", link: '/commercial' }
                ]
            },
            {
                header: "Industrial for rent",
                submenu: [
                    { sub: "Warehouse", link: '/warehouse' }
                ]
            },
            {
                header: "Rental Resources",
                submenu: [
                    { sub: "List my home for rent", link: '/add-list' }
                ]
            }
        ],

        buy: [
            {
                header: "Homes for sale",
                submenu: [
                    {sub: "House and Lot", link: '/house-and-lot'}, 
                    {sub: "Condominium", link: '/condominium'},  
                    {sub: "Townhouse", link: '/townhouse'}, 
                    {sub: "Land/Lot", link: '/lot'}
                ]
            },
            {
                header: "Commercial for rent",
                submenu: [
                    {sub: "Office Space", link: '/office-space'}, 
                    { sub: "Retail Spaces", link: '/retail-space' }, 
                    { sub: "Serviced Office", link: '/service-office' }, 
                    { sub: "Commercial Land/Office", link: '/commercial' }
                ]
            },
            {
                header: "Leisure Properties for Sale",
                submenu: [
                    { sub: "Hotel/Resort", link: '/hotel-and-resort' },
                    {
                        childSubMenu: {
                        header: "Agricultural for Sale",
                        submenu: [
                            { sub: "Farm Lot", link: '/farm-lot' }
                        ]
                        },
                    }
                ],
                
            },
            {
                header: "Resources",
                submenu: [
                    { sub: "Buyers Guide", link: '/buyer-guide' }
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
                        </div>,
                        link: '/home'
                    }
                ]
            },
            {
                header: "Home Loan Guide",
                submenu: [
                    {sub: "Discover Home Loan", link: '/home-loan'}, 
                    { sub: "Loan Calculator", link: '/loan-calculator' }
                ]
            },
            {
                header: "Explore more options",
                submenu: [
                    { sub: "Refinance your home", link: '/home-refinance' },
                    { sub: "Learn more about mortgage process", link: '/mortgage-process' },
                    { sub: "Car Loan", link: '/car-loan' },
                    { sub: "Quick Cash Loan", link: '/quick-cash-loan' },
                    { sub: "Pensioner's Loan", link: '/pension-loan' },

                ],
                
            },
        ]

    }


export {
    SubMenu
}