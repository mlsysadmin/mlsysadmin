import { Col, Divider, Menu } from 'antd';
import React from 'react'
import { SubMenu } from '../../../../utils/MenuPopover.utils';
import RoundBtn from '../../../custom/buttons/RoundBtn.custom';
import TextBtn from '../../../custom/buttons/TextBtn.custom';

const SidebarMenu = () => {

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
        { label: "Sell", key: "Sell", link: '/sell'}, 
        { label: "New", key: "New", link: '/new'}, 
        { 
            label:  "Rent", key: "Rent",
            children: SubMenuChild(SubMenu.rent)

        }, 
        { label: "Buy", key: "Buy", children: SubMenuChild(SubMenu.buy) }, 
        { label: "Home Loan", key: "Home Loan", children: SubMenuChild(SubMenu.homeLoan) }, 
        { label: "Home Insurance", key: "Home Insurance", children:SubMenuChild(SubMenu.homeInsurance)}, 
        { label: "Other Services", key: "Other Services", link: '/other-services' }, 
        { label: "Contact", key: "Contact", link: '/contact-us' },
    ]

    const items = MenuItems.map((item, index) => ({
        key: item.key,
        label: item.label,
        link: item.link,
        children: item.children
    }));

    return (
        <>
            <Menu
            // onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            className='sidebar-menu'
            />
            <Divider />
            <div>
                <Col align="left" className='menu-buttons'>
                        <TextBtn label="Login" style={{ 
                            color:"#8C9094", 
                            fontFamily: '"Poppins", sans-serif', 
                            display: "block",
                            margin: '10px 0'  }}/>
                        {/* <div style={{ color:"#D90000" }}>/</div> */}
                        <TextBtn label="Register" style={{ 
                            color:"#8C9094", 
                            fontFamily: '"Poppins", sans-serif', 
                            display: "block",
                            margin: '10px 0' }}/>
                </Col>
                <RoundBtn 
                    type="primary"
                    className="menu-buttons"
                    style={{ background: "#D90000", fontFamily: '"Poppins", sans-serif'  }}
                    label="List your Property"
                />
            </div>
        </>
    )
}

export default SidebarMenu