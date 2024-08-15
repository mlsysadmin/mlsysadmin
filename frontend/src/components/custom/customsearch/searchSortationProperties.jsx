import React from "react";
import "../../../styles/searchsortation.css"
import { Dropdown, Menu, Space } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { GetPublicListingCount } from "../../../api/GetAllPublicListings";

const SearchPropertiesSoration = () =>{
   const [publicListingCount, setPublicListingCount] = useState(0);

    const [selectedSort, setSelectedSort] = useState("Most relevant");

			const handleMenuClick = (e) => {
				setSelectedSort(e.key); // Update the selected sort option based on the clicked item
			};

			const menu = (
				<Menu onClick={handleMenuClick}>
					<Menu.Item key="Most relevant">Most relevant</Menu.Item>
					<Menu.Item key="New Listings">New Listings</Menu.Item>
					<Menu.Item key="Old Listings">Old Listings</Menu.Item>
					<Menu.Item key="Highest Price">Highest Price</Menu.Item>
					<Menu.Item key="Lowest Price">Lowest Price</Menu.Item>
					<Menu.Item key="Order Title A-Z">Order Title A-Z</Menu.Item>
					<Menu.Item key="Order Title Z-A">Order Title Z-A</Menu.Item>
				</Menu>
			);

      const GetCountListings = async() =>{
            const res = await GetPublicListingCount();
            console.log("count", res);
            setPublicListingCount(res);
      }
      useEffect (()=>{
        GetCountListings();
      }, [])


    return (
			<div className="search-sortation">
				<div className="sort">
					<span>
						Showing {publicListingCount} out of {publicListingCount} entries{" "}
					</span>
				</div>
				<div className="sort-div-class">
					<Dropdown overlay={menu}>
						<Space>
							Sort: {selectedSort}
							<CaretDownOutlined />
						</Space>
					</Dropdown>
				</div>
			</div>
		);
}

export default SearchPropertiesSoration