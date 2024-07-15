import React from 'react';
import { Card, Col, Divider, Image, Row } from 'antd'
import { FeaturedProperties } from '../utils/ListingMockData';
import '../styles/featuredProperties.css';

const FeaturedPropertiesComponent = ({ }) => {

    const Features = ({ features }) => {

        const featureLength = features.length;

        console.log(featureLength);

        return features.map((feature, i) => {
            return (
                <div className='featured' key={i}>
                    <div className="feature">
                        {/* <div> */}
                            <p>{feature.value}</p>
                            <div className="feature-icon">
                                <img src={feature.icon} alt="feature-icon" width={27} />
                            </div>
                        {/* </div> */}
                    </div>
                    { i < features.length - 1 && <Divider type="vertical" className='featured-divider' />}
                </div>
            )
        })
    }
    return (
        <Row id='featured-properties' gutter={[16, { xs: 8, sm: 16, md: 32, lg: 48 }]}>
            {
                FeaturedProperties.map((featured, i) => {
                    return (
                        <Col
                            // span={8}
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
                                    <h4 className='featured-price'>{featured.price}</h4>
                                    <p className='featured-title'>{featured.title}</p>
                                    <p className='featured-listing-type'>{featured.status}</p>
                                    <div className="featured-features">
                                        {
                                            <Features features={featured.features} />
                                        }
                                    </div>
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