import { Button, Card, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import '../styles/cardListing.css';
import CustomImage from './custom/images/Image.custom';
import Sqm from '../asset/icons/sqm.png';
import Shower from '../asset/icons/shower.png';
import FilterIcon from '../asset/icons/slider.png';
import CustomTag from './custom/tags/Tags.custom';
import { CameraFilled, HeartFilled, HeartOutlined } from '@ant-design/icons';

const CardListingComponent = ({ loading, status, pics, title, price, features, listingId }) => {

    const [checked, setIsChecked] = useState(false);
    const [likes, setLikes] = useState([]);
    
    // console.log("likes", likes);

    const ImageTag = () => (
        <div className='image-tag'>
            <CameraFilled />
            <p>{pics}</p>
        </div>
    )

    const Filter = () => (
        <div className="image-tag">
            <img src={FilterIcon} alt="filter-icon" />
        </div>
    )

    const Features = () => {
        return features?.map((feature, i) => {
            return (
                <div className="feature-content" key={i}>
                    <img src={Shower} alt="sqm" className='feature-icon' />
                    <p className='feature-detail'>{feature.value}</p>
                </div>
            )
        })
    }

    const handleChange = (isChecked, tag) => {

        // console.log("tag", tag);
        // console.log("check", isChecked);
        // setIsChecked(isChecked);

        const id = tag._owner.memoizedProps.listingId;

        const nextSelectedTags = isChecked && !likes.includes(id)? 
            [...likes, id]
            : 
            likes.filter((t) => t !== id);
            
            setLikes(nextSelectedTags);
            setIsChecked(isChecked);
            
    }


    return (
        <div id='card-listing'>
            <Card
                // style={{
                //     width: 350,
                // }}
                size='small'
                bordered={false}
                loading={loading}
            >
                <div className='listing-image'>
                    <div className="tags">
                        <CustomTag tagLabel={status} />
                        <CustomTag tagLabel={<ImageTag />} />
                    </div>
                    <div className="tags-right">
                        <CustomTag
                            tagLabel={checked ? <HeartFilled /> : <HeartOutlined />}
                            style={{ fontSize: '23px', color: '#D90000' }}
                            className="circle-tags heart"
                            checkable={true}
                            checked={checked}
                            handleChange={handleChange}

                        />
                        {' '}
                        <CustomTag tagLabel={<Filter />} className="circle-tags" />
                    </div>
                </div>
                <div className='card-content'>
                    <div className="card-content--title">
                        <h4>{title}</h4>
                    </div>
                    <Row className="card-content--subtitle">
                        <p className='price'>{price}</p>
                        <div className='features'>
                            <Features />
                            <div className="feature-content">
                                <img src={Shower} alt="sqm" className='feature-icon' />
                                <p className='feature-detail'>3</p>
                            </div>
                            <div className="feature-content">
                                <img src={Sqm} alt="sqm" className='feature-icon' />
                                <p className='feature-detail'>52 SqM</p>
                            </div>
                        </div>
                    </Row>
                </div>
            </Card>
        </div>
    )
}

export default CardListingComponent