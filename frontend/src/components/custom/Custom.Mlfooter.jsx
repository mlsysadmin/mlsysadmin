import React from "react";
import { Row, Col } from 'antd';
import mllogo from "../../asset/icons/mllogo.png";
import applestore from "../../asset/icons/applestore.png";
import gplaystore from "../../asset/icons/gplaystore.png";
import huaweistore from "../../asset/icons/huaweistore.png";
import { FacebookFilled, TwitterCircleFilled, YoutubeOutlined, InstagramFilled, CustomerServiceFilled } from '@ant-design/icons';
import "../../styles/custom.mlfooter.css";


const CustomMlFooter = () => {
    return (
			<div className="third-content-footer">
				<div className="third-cont">
					<div className="col-footer-container">
						<Col span={8} className="col-footer-name">
							<img src={mllogo} alt="ML Logo" className="logo-ml" />
							<div className="customer-care">
								<CustomerServiceFilled style={{ color: "#ff2800" }} />
								<span>customercare@mlhuillier.com</span>
							</div>
							<div className="firstcol-icons">
								<FacebookFilled className="social-icon" />
								<TwitterCircleFilled className="social-icon" />
								<InstagramFilled className="social-icon" />
								<YoutubeOutlined className="social-icon" />
							</div>
						</Col>
						<Col className="col-footer-name" span={5}>
							<div className="col-title">Quick Links</div>
							<div className="col-cont">
								<div>Online Services</div>
								<div>Products & Services</div>
								<div>About Us</div>
								<div>Careers</div>
							</div>
						</Col>
						<Col className="col-footer-name" span={5}>
							<div className="col-title">Support</div>
							<div className="col-cont">
								<div>FAQs</div>
								<div>Contact Us</div>
								<div>Privacy Notice</div>
								<div>Terms and Conditions</div>
							</div>
						</Col>
						<Col span={5} className="col-footer-name">
							<div className="col-title">Downloads</div>
							<div className="last-col-icons">
								<div>
									{" "}
									<img src={applestore} alt="Apple App Store" />
								</div>
								<div>
									{" "}
									<img src={gplaystore} alt="Google Play Store" />
								</div>
								<div>
									<img src={huaweistore} alt="App Gallery" />
								</div>
							</div>
						</Col>
					</div>
				</div>
			</div>
		);


}

export default CustomMlFooter
