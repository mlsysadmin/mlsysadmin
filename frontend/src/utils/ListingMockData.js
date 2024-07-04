import { Filter, ImageTag } from "./IconTags.utils";
import Featured_1 from '../asset/newproperties-rent-sale/img1.png';
import Featured_2 from '../asset/newproperties-rent-sale/img2.png';
import Featured_3 from '../asset/newproperties-rent-sale/img3.png';

import sqm from '../asset/icons/outlined-sqm.png';
import shower from '../asset/icons/hotel-shower.png';
import bed from '../asset/icons/outlined-bed.png';


const MockData = [
    {
        listing_id: '123',
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 11,440,000/month',
        features: [
            {
                icon: '',
                value: "52 SqM"
            },
            {
                icon: '',
                value: "3"
            }
        ],
        status:'For Rent',
        pics: '15'
    },
    {
        listing_id: '1234',
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 11,440,000/month',
        features: [
            {
                icon: '',
                value: "52 SqM"
            },
            {
                icon: '',
                value: "3"
            }
        ],
        status:'For Rent',
        pics: '15'
    },
    {
        listing_id: '12345',
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 11,440,000/month',
        features: [
            {
                icon: '',
                value: "52 SqM"
            },
            {
                icon: '',
                value: "3"
            }
        ],
        status:'For Rent',
        pics: '15'
    },
    {
        listing_id: '123456',
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 11,440,000/month',
        features: [
            {
                icon: '',
                value: "52 SqM"
            },
            {
                icon: '',
                value: "3"
            }
        ],
        status:'For Rent',
        pics: '15'
    },
    {
        listing_id: '123457',
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 11,440,000/month',
        features: [
            {
                icon: '',
                value: "52 SqM"
            },
            {
                icon: '',
                value: "3"
            }
        ],
        status:'For Rent',
        pics: '15'
    }
]

const FeaturedProperties = [
    {
        listing_id: '123457',
        image: Featured_1,
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 90,440',
        features: [
            {
                icon: sqm,
                value: "52 SqM"
            }
        ],
        status:'For Rent',
        pics: '15'
    },
    {
        listing_id: '123457',
        image: Featured_2,
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 400,440,000',
        features: [
            {
                icon: sqm,
                value: "52 SqM"
            },
            {
                icon: bed,
                value: "3"
            }
        ],
        status:'For Sale',
        pics: '15'
    },
    {
        listing_id: '123457',
        image: Featured_3,
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 121,440,000',
        features: [
            {
                icon: sqm,
                value: "52 SqM"
            },
            {
                icon: shower,
                value: "3"
            }
        ],
        status:'For Pre-Selling',
        pics: '15'
    },
    {
        listing_id: '123457',
        image: Featured_3,
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 121,440,000',
        features: [
            {
                icon: sqm,
                value: "52 SqM"
            },
            {
                icon: bed,
                value: "3"
            }
        ],
        status:'For Pre-Selling',
        pics: '15'
    },
    {
        listing_id: '123457',
        image: Featured_3,
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 121,440,000',
        features: [
            {
                icon: sqm,
                value: "52 SqM"
            },
            {
                icon: shower,
                value: "3"
            }
        ],
        status:'For Pre-Selling',
        pics: '15'
    },
    {
        listing_id: '123457',
        image: Featured_3,
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 121,440,000',
        features: [
            {
                icon: sqm,
                value: "52 SqM"
            },
            {
                icon: shower,
                value: "3"
            },
            {
                icon: bed,
                value: "3"
            }
        ],
        status:'For Pre-Selling',
        pics: '15'
    }
]

const Ratings = [
    {
        numRate: 5,
        user: 'Jack Frost',
        rate: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        numRate: 4.5,
        user: 'Ran Takahashi',
        rate: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        numRate: 4,
        user: 'Pablo Nase',
        rate: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        numRate: 4.7,
        user: 'Gojo Satoru',
        rate: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
]

export {
    MockData,
    FeaturedProperties,
    Ratings
};