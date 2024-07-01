import { Button, Menu, Row } from 'antd'
import React, { useEffect, useState } from 'react';
import MenuPopup from './MenuPopup';
import MenuPopupContent from './MenuPopupContent';
import { SubMenu } from '../../../../utils/MenuPopover.utils';
import { useNavigate, useLocation } from 'react-router-dom';
import RoundBtn from '../../../custom/buttons/RoundBtn.custom';
import TextBtn from '../../../custom/buttons/TextBtn.custom';

const HeaderMenu = () => {
    const [currentMenu, setCurrent] = useState('');
    const [rentPopUpOpen, setrentPopUpOpen] = useState(false);
    const [buyPopUpOpen, setbuyPopUpOpen] = useState(false);
    const [homeLoanPopUpOpen, sethomeLoanPopUpOpen] = useState(false);
    const [homeInsurancePopUpOpen, sethomeInsurancePopUpOpen] = useState(false);
    const [otherServicesPopUpOpen, setotherServicesPopUpOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     const setTogglePopoverOutside = (event) => {
    //     //   if (modal) {
    //         const classNameBtn = event.target.className === "ant-popover-open";
      
    //         setrentPopUpOpen(!classNameBtn);
    //     //   }
    //     };
    
    //     window.addEventListener("click", setTogglePopoverOutside);
    
    //     return () => {
    //       window.removeEventListener("click", setTogglePopoverOutside);
    //     };
    //   }, []);

    useEffect(() => {
        const path = location.pathname.replace('/', '');

        setCurrent(path)
    }, [setCurrent])

    const handleMenuOnClick = (menu) => {
        if (menu.key === "rent") {
            setbuyPopUpOpen(false);
            sethomeLoanPopUpOpen(false);
            sethomeInsurancePopUpOpen(false);
            setotherServicesPopUpOpen(false);
            setrentPopUpOpen(true);
        }
        else if (menu.key === "buy") {
            setrentPopUpOpen(false);
            sethomeLoanPopUpOpen(false);
            sethomeInsurancePopUpOpen(false);
            setotherServicesPopUpOpen(false);
            setbuyPopUpOpen(true);
        }
        else if (menu.key === "home-loan") {
            setrentPopUpOpen(false);
            setbuyPopUpOpen(false);
            sethomeInsurancePopUpOpen(false);
            setotherServicesPopUpOpen(false);
            sethomeLoanPopUpOpen(true);
        }
        else if (menu.key === "home-insurance"){
            setrentPopUpOpen(false);
            setbuyPopUpOpen(false);
            sethomeLoanPopUpOpen(false);
            setotherServicesPopUpOpen(false);
            sethomeInsurancePopUpOpen(true)
        }
        else if (menu.key === "other-services"){
            setrentPopUpOpen(false);
            setbuyPopUpOpen(false);
            sethomeLoanPopUpOpen(false);
            sethomeInsurancePopUpOpen(false);
            setotherServicesPopUpOpen(true);
        }
        else{
            console.log("menu",menu);
            setCurrent(menu.key);
            navigate({
                pathname: menu.item.props.link
            })
            setrentPopUpOpen(false);
            setbuyPopUpOpen(false);
            sethomeLoanPopUpOpen(false);
            sethomeInsurancePopUpOpen(false);
            setotherServicesPopUpOpen(false);
        }
    }

    const RentMenuPopContent = (
        <MenuPopupContent submenu={SubMenu.rent} />
    )

    const BuyMenuPopContent = (
        <MenuPopupContent submenu={SubMenu.buy}/>
    )

    const HomeLoanMenuPopContent = (
        <MenuPopupContent submenu={SubMenu.homeLoan}/>
    )
    const HomeInsuranceMenuPopContent = (
        <MenuPopupContent submenu={SubMenu.homeInsurance}/>
    )
    const OtherServicesMenuPopContent = (
        <MenuPopupContent submenu={SubMenu.otherServices}/>
    )


    const RentMenu = () => (
        <MenuPopup 
            // handleOpenChange={handleRentOpenChange}
            title={'Looking for your dream rental home?'}
            popUpOpen={rentPopUpOpen}
            label={"Rent"}
            content={RentMenuPopContent}
            
        />
    )
    const BuyMenu = () => (
        <MenuPopup 
            // handleOpenChange={handleBuyOpenChange}
            title={'Looking for your perfect home?'}
            popUpOpen={buyPopUpOpen}
            label={"Buy"}
            content={BuyMenuPopContent}
            
        />
    )

    const HomeLoanMenu = () => (
        <MenuPopup 
            // handleOpenChange={handleBuyOpenChange}
            title={
                ''
            }
            popUpOpen={homeLoanPopUpOpen}
            label={"Home Loan"}
            content={HomeLoanMenuPopContent}  
        />
    )
    const HomeInsuranceMenu = () => (
        <MenuPopup 
            // handleOpenChange={handleBuyOpenChange}
            title={
                ''
            }
            popUpOpen={homeInsurancePopUpOpen}
            label={"Home Insurance"}
            content={HomeInsuranceMenuPopContent}  
        />
    )
    const OtherServicesMenu = () => (
        <MenuPopup 
            // handleOpenChange={handleBuyOpenChange}
            title={'Learn more about our Products and Services'}
            popUpOpen={otherServicesPopUpOpen}
            label={"Other Services"}
            content={OtherServicesMenuPopContent}
            
        />
    )

    const MenuItems = [
        { label: "Sell", key: "sell", link: '/sell'}, 
        { label: "New", key: "new", link: '/new'}, 
        { label:  <RentMenu/>, key: "rent" }, 
        { label: <BuyMenu/>, key: 'buy' }, 
        { label: <HomeLoanMenu/>, key: "home-loan" }, 
        { label: <HomeInsuranceMenu/>, key: "home-insurance", link: '/home-insurance' }, 
        { label: <OtherServicesMenu/>, key: "other-services", link: '/other-services' }, 
        { label: "Contact", key: "contact", link: '/contact-us' },
    ]
    
    const items = MenuItems.map((item, index) => ({
        key: item.key,
        label: item.label,
        link: item.link
    }));

  return (
    <>
        <div 
            style={{
                display: 'flex',
                borderBottom: "none",
                alignItems:"center",
                alignContent:"center",
                flexFlow: "wrap",
                flexWrap: "wrap"
            }}

            id='menu-wrapper'
        >
            <Menu
                mode="horizontal"
                items={items}
                selectedKeys={[currentMenu]}
                onClick={handleMenuOnClick}
                className='header--menu'
            >
            </Menu>
            <Row align={"middle"} className='menu-buttons'>
                <TextBtn label="Login" style={{ color:"#D90000" }}/>
                <div style={{ color:"#D90000" }}>/</div>
                <TextBtn label="Register" style={{ color:"#D90000" }}/>
            </Row>
            <RoundBtn 
                type="primary"
                className="menu-buttons"
                style={{ background: "#D90000" }}
                label="List your Property"
            />
        </div>
    </>
  )
}

export default HeaderMenu