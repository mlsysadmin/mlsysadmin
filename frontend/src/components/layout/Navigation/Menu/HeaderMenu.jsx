import { Button, Menu, Row } from 'antd'
import React, { useEffect, useState } from 'react';
import MenuPopup from './MenuPopup';
import MenuPopupContent from './MenuPopupContent';
import { SubMenu } from '../../../../utils/MenuPopover.utils';

const HeaderMenu = () => {
    const [currentMenu, setCurrent] = useState('');
    const [rentPopUpOpen, setrentPopUpOpen] = useState(false);
    const [buyPopUpOpen, setbuyPopUpOpen] = useState(false);
    const [homeLoanPopUpOpen, sethomeLoanPopUpOpen] = useState(false);

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

    const handleMenuOnClick = (menu) => {
        setCurrent(menu.key);
        if (menu.key === "Rent") {
            setbuyPopUpOpen(false);
            sethomeLoanPopUpOpen(false);
            setrentPopUpOpen(true);
        }
        else if (menu.key === "Buy") {
            setrentPopUpOpen(false);
            sethomeLoanPopUpOpen(false);
            setbuyPopUpOpen(true);
        }
        else if (menu.key === "Home Loan") {
            setrentPopUpOpen(false);
            setbuyPopUpOpen(false);
            sethomeLoanPopUpOpen(true);
        }
        else{
            setrentPopUpOpen(false);
            setbuyPopUpOpen(false);
            sethomeLoanPopUpOpen(false);
        }
    }

    const RentMenuPopContent = (
        <MenuPopupContent submenu={SubMenu.rent}/>
    )

    const BuyMenuPopContent = (
        <MenuPopupContent submenu={SubMenu.buy}/>
    )

    const HomeLoanMenuPopContent = (
        <MenuPopupContent submenu={SubMenu.homeLoan}/>
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

    const MenuItems = [
        { label: "Sell", key: "Sell"}, 
        { label: "New", key: "New"}, 
        { label:  <RentMenu/>, key: "Rent" }, 
        { label: <BuyMenu/>, key: "Buy" }, 
        { label: <HomeLoanMenu/>, key: "Home Loan" }, 
        { label: "Home Insurance", key: "Home Insurance" }, 
        { label: "Other Services", key: "Other Services" }, 
        { label: "Contact", key: "Contact" },
    ]
    
    const items = MenuItems.map((item, index) => ({
        key: item.key,
        label: item.label,
    }));

  return (
    <>
        <div 
            style={{
                display: 'flex',
                // justifyContent:"end",
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
                // style={{
                //     flex: 1,
                //     justifyContent:"end",
                //     borderBottom: "none",
                // }}
                className='header--menu'
            >
            </Menu>
            <Row align={"middle"} className='menu-buttons'>
                <Button style={{ color:"#D90000" }} type='text'>Login</Button>
                <div style={{ color:"#D90000" }}>/</div>
                <Button style={{ color:"#D90000" }} type='text'>Register</Button>
            </Row>
            <Button type='primary' shape='round' className='menu-buttons' 
                style={{ background: "#D90000" }}
            >List your Property</Button>
        </div>
    </>
  )
}

export default HeaderMenu