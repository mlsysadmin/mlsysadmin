import { Col, Divider, Menu } from 'antd';
import React, { useState, useEffect } from 'react'
import { SubMenu } from '../../../../utils/MenuPopover.utils';
import RoundBtn from '../../../custom/buttons/RoundBtn.custom';
import userProfile from "../../../../assets/profile-user.png";
import TextBtn from '../../../custom/buttons/TextBtn.custom';
import { linearProgressClasses } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarMenu = ({setOpenDrawer}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [currentMenu, setCurrent] = useState("");

    useEffect(() => {
        const path = location.pathname.replace("/", "");

        setCurrent(path);
    }, [setCurrent]);

    const SubMenuChild = (submen) => {
        const m = submen.map((menu, index) => {
            return {
                key: menu.header,
                label: menu.header,
                type: 'group',
                children: menu.submenu?.map((sub, key) => {
                    // let childSub = sub.childSubMenu;
                    return Object.keys(sub).includes("childSubMenu") ?
                        {
                            key: sub.childSubMenu.header,
                            label: sub.childSubMenu.header,
                            link: sub.link,
                            type: 'group',
                            children: Object.keys(sub).includes("childSubMenu") ? sub.childSubMenu.submenu.map((i, k) => {
                                return {
                                    key: i.header,
                                    label: i.sub
                                }
                            })
                                : []

                        }
                        : Object.keys(sub).includes("sub_info") ?
                            {
                                key: sub.sub_info,
                                label: 'Home Loan Dashboard',
                                link: sub.link,

                            }
                            : Object.keys(sub).includes("sub_info_insurance") ?
                                {
                                    key: sub.sub_info_insurance,
                                    label: 'Home Insurance Dashboard',
                                    link: sub.link,

                                }
                                :
                                {
                                    key: sub.sub,
                                    label: sub.sub,
                                    link: sub.link,
                                }

                })
            }
        })

        return m;
    }

    const MenuItems = [
        { label: "Sell", key: "sell", link: '/sell' },
        { label: "New", key: "new", link: '/new' },
        {
            label: "Rent", key: "rent",
            children: SubMenuChild(SubMenu.rent)

        },
        { label: "Buy", key: "buy", children: SubMenuChild(SubMenu.buy), link: '/buy' },
        { label: "Home Loan", key: "home-loan", children: SubMenuChild(SubMenu.homeLoan) },
        { label: "Home Insurance", key: "home-insurance", children: SubMenuChild(SubMenu.homeInsurance) },
        { label: "Other Services", key: "other-services", children: SubMenuChild(SubMenu.otherServices) },
        { label: "Contact", key: "contact", link: '/contact-us' },
    ]

    const items = MenuItems.map((item, index) => ({
        key: item.key,
        label: item.label,
        link: item.link,
        children: item.children
    }));

    const handleMenuOnClick = (menu) => {
        console.log("menu", menu);
        setCurrent(menu.key);
        setOpenDrawer(false)
        navigate({
            pathname: menu.item.props.link,
        });
    };

    return (
        <>
            <Menu
                // onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={items}
                selectedKeys={[currentMenu]}
                mode="inline"
                className='sidebar-menu'
                onClick={handleMenuOnClick}
            />
            <Divider />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <RoundBtn
                    type="primary"
                    className="menu-buttons"
                    style={{ background: "#D90000", fontFamily: '"Poppins", sans-serif', }}
                    label="List your Property"
                />
                <Col align="left" className='menu-buttons'>
                    <img src={userProfile} style={{ width: "30px", cursor: "pointer" }}></img>
                </Col>

            </div>
        </>
    )
}

export default SidebarMenu