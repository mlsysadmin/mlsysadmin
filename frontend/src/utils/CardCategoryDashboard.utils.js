import image from '../asset/banners/listing.png';
import Buy from '../asset/icons/buy.png';
import Sell from '../asset/icons/sell.png';
import Rent from '../asset/icons/rent.png';
import Landlord from '../asset/icons/landlord.png';
import { Image } from 'antd';

const CardCategory = [
	{
		icon: Buy,
		image: image,
		category: "Buy",
		decription: `Explore a diverse range of properties, from cozy starter homes to 
        luxurious estates and everything in between. Whatever your preferences and budget, 
        we have options to suit your needs.`,
		buttonTitle: "Browse Home",
	},
	{
		icon: Sell,
		image: image,
		category: "Sell",
		decription: `Our platform is designed to expedite the selling process, saving you time and effort.`,
		buttonTitle: "See your options",
	},
	{
		icon: Rent,
		image: image,
		category: "Rent",
		decription: `Discover your dream rental property today! Let us help you find the 
        perfect place to live your best life!`,
		buttonTitle: "Find rentals",
	},
	// {
	// 	icon: Rent,
	// 	image: image,
	// 	category: "Rent",
	// 	decription: `Discover your dream rental property today! Let us help you find the 
    //     perfect place to live your best life!`,
	// 	buttonTitle: "Find rentals",
	// },
	// {
	// 	icon: Rent,
	// 	image: image,
	// 	category: "Rent",
	// 	decription: `Discover your dream rental property today! Let us help you find the 
    //     perfect place to live your best life!`,
	// 	buttonTitle: "Find rentals",
	// },
];

export default CardCategory;