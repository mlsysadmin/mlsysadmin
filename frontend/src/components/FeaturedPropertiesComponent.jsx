import React from 'react';
import { Card, Col, Image, Row } from 'antd'
import { FeaturedProperties } from '../utils/ListingMockData';
import '../styles/featuredProperties.css';

const FeaturedPropertiesComponent = ({ }) => {
    return (
        <Row id='featured-properties'>
            {
                FeaturedProperties.map((featured, i) => {
                    return (
                        <Col
                        span={8}
                            className="featured-property"
                            key={i}
                            // style={{ background: `url(${featured.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        >
                            <div className="featured-img">
                                <Image preview={false} src={featured.image} />
                            </div>
                            <div className="featured-property--content">
                                <Card 
                                    loading={false}
                                >
                                    <p>{featured.price}</p>
                                    <p>{featured.price}</p>
                                    <p>{featured.price}</p>
                                    <p>{featured.price}</p>
                                    <p>{featured.price}</p>
                                </Card>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default FeaturedPropertiesComponent