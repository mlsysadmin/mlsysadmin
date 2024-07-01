import { Filter, ImageTag } from "./IconTags.utils";
import Featured_1 from '../asset/newproperties-rent-sale/img1.png';
import Featured_2 from '../asset/newproperties-rent-sale/img2.png';
import Featured_3 from '../asset/newproperties-rent-sale/img3.png';


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
        image: Featured_2,
        title: "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do",
        price: 'PHP 400,440,000',
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
                icon: '',
                value: "52 SqM"
            },
            {
                icon: '',
                value: "3"
            }
        ],
        status:'For Pre-Selling',
        pics: '15'
    }
]

export {
    MockData,
    FeaturedProperties
};