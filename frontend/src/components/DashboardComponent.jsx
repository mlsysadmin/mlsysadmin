import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { Button, Card, Col, Image, Menu, Row, Space, Tag } from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RoundBtn from './custom/buttons/RoundBtn.custom';
import RoundInput from './custom/inputs/RoundInput.custom';
import RoundSelect from './custom/selects/RoundSelect.custom';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import CardListingComponent from './CardListingComponent';
import { MockData } from '../utils/ListingMockData';
import SemiRoundBtn from './custom/buttons/SemiRoundBtn.custom';
import CardCategory from '../utils/CardCategoryDashboard.utils';
import FuenteCircle from '../asset/banners/fuente-circle.png';
import FeaturedPropertiesComponent from './FeaturedPropertiesComponent';

const DashboardComponent = () => {

  const [loading, setLoading] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    console.log(userLikes);
  })

  const tags = [
    {
      key: "all",
      label: "All",
      link: ""
    },
    {
      key: "new",
      label: "New Listing",
      link: ""
    },
    {
      key: "featured",
      label: "Featured",
      link: ""
    },
    {
      key: "for-sale",
      label: "For Sale",
      link: ""
    },
    {
      key: "for-rent",
      label: "For Rent",
      link: ""
    },
    {
      key: "mortgage",
      label: "Mortgage",
      link: ""
    }
  ]

  const Tags = () => (
    <Menu
      className='menu-tags'
      mode="horizontal"
      items={tags}
      selectedKeys={'all'}
    />
  )
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 480,
        min: 315
      },
      items: 1,
      partialVisibilityGutter: 0
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 481
      },
      items: 1,
      partialVisibilityGutter: 30
    }

  };

  const CardCategories = () => {
    return CardCategory.map((item, i) => {
      return (
        <Col key={i}>
          <Card style={{
            backgroundImage: `url(${item.image})`
          }}>
            <div className="overlay-content">
              <div className="overlay-icon">
                <span><Image src={item.icon} preview={false} height={30} /></span>
              </div>
              <div className="overlay-title">
                {item.category}
              </div>
              <div className="overlay-description">
                {item.decription}
              </div>
            </div>
          </Card>
        </Col>
      )
    })
  }

  return (
    <div className='dashboard'>
      <div id='dashboard'>
        <div className="banner">
          <div className="banner-content">
            <Col className='banner-title'>
              <h1>Find Your Dream Home</h1>
            </Col>
            <Col className="banner-tags">
              <Tags />
            </Col>
            <Col className='banner-search'>
              <Card>
                <Row className='search-container'>
                  <RoundInput
                    placeholder="Enter keyword"
                    size="middle"
                    classname="card-item field" />
                  <RoundSelect
                    placeholder="Location"
                    size="middle"
                    classname="card-item field"
                    suffixIcon={<CaretDownOutlined />} />
                  <RoundSelect
                    placeholder="Property Type"
                    size="middle"
                    classname="card-item field"
                    suffixIcon={<CaretDownOutlined />} />
                  <RoundSelect
                    placeholder="Listing Type"
                    size="middle"
                    classname="card-item field"
                    suffixIcon={<CaretDownOutlined />} />
                  <Row className='search-buttons'>
                    <RoundBtn
                      label={'Advanced'}
                      className='advanced round-btn'
                      icon={
                        <>
                          <SearchOutlined className='search-icon' style={{ fontWeight: '900' }} />
                          {/* <PlusOutlined className='plus-icon' /> */}
                        </>
                      }
                      classname="card-item" />
                    <RoundBtn
                      label={'Search'}
                      className='search round-btn'
                      icon={<SearchOutlined className='search-icon' />}
                      classname="card-item" />
                  </Row>
                </Row>
              </Card>
            </Col>
          </div>
        </div>
      </div>
      <div className="discover">
        <Row className='discover-content'>
          <Col className='discover-section--title'>
            <h2>Discover Latest Properties</h2>
            <p>Newest Properties Around You</p>
          </Col>
        </Row>
        <div className="listing-carousel">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            dotListClass=""
            draggable
            focusOnSelect={false}
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            slidesToSlide={1}
            swipeable
            responsive={responsive}
            className="card-listing--carousel"
            containerClass="container-carousel"
            infinite
            itemClass='carousel-item'
            transitionDuration={300}
            sliderClass='carousel-slider-ul'
          >
            {
              MockData.map((item, i) => {
                return (
                  <CardListingComponent
                    title={item.title}
                    price={item.price}
                    status={item.status}
                    pics={item.pics}
                    features={item.features}
                    key={i}
                    listingId={item.listing_id}
                    loading={loading}
                  />
                )
              })
            }
          </Carousel>
        </div>
        <div className="see-more--container">
          <SemiRoundBtn label={'SEE MORE NEW LISTINGS'} size="large" className="see-more--btn" />
        </div>
        <div className="discover--section-2">
          <h3>Helping you buy, rent and sell in Real Estate</h3>
          <Row className="card--brokerage-category" gutter={[16, 16]}>
            <CardCategories />
          </Row>
        </div>
        <div className="discover--section-3">
          <div className="card--brokerage-inquire">
            <div className='inquire-image'>
              <Image src={FuenteCircle} preview={false} />
            </div>
            <div className='inquire-container'>
              <div className="inquire--content">
                <div className="inquire--title">
                  <h3>Thinking about selling your Home?</h3>
                </div>
                <div className="inquire--description">
                  <p>
                    Don't let selling your property become a burden. Join our platform today
                    and exprience the ease and convenience of selling with us
                  </p>
                </div>
                <div className="inquire--sub-desc">
                  <p>
                    Sign up now and take the first step toward a successful property sale!
                  </p>
                </div>
                <div className="inquire--actions">
                  <RoundBtn
                    label={'Contact us'}
                    type={'default'}
                    className='contact-us--action action-btn'
                    size={'large'} />
                  <RoundBtn
                    label={'Sign in'}
                    type={'default'}
                    className='sign-in--action action-btn'
                    size={'large'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="discover--section-4">
          <div className="card--brokerage-featured">
            <div className='featured-container'>
                <div className="featured--title">
                  <h3>Featured Properties</h3>
                </div>
              <div className="featured--content">
                <FeaturedPropertiesComponent/>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  )
}

export default DashboardComponent