import React, { useState } from "react";
import { Row, Col } from "antd";
import ListingSteps from "./seller-broker/ListingSteps";
import UnitDetails from "./seller-broker/UnitDetails";
import PropertyDetails from "./seller-broker/PropertyDetails";
import LocationDetails from "./seller-broker/LocationDetails";
import DescriptionDetails from "./seller-broker/DescriptionDetails";
import PhotoUpload from "./seller-broker/PhotoUpload";
import FeatureDetails from "./seller-broker/FeaturesDetails";
import ListingBanner from "./layout/ListingBanner";



const SellerListingForm = () => {
    const [currentStep, setCurrentStep] =useState(0)


    const steps = [
        { title: `Property Details`, component: PropertyDetails },
        { title: `Unit Details`, component: UnitDetails },
        { title: `Location`, component: LocationDetails },
        { title: `Description`, component: DescriptionDetails },
        { title: `Photos`, component: PhotoUpload },
        { title: `Features`, component: FeatureDetails },
    ];

    const CurrentStepComponent = steps[currentStep].component;


    return (
        <Row style={{ margin:'8px 200px'}}>
            <ListingBanner/>
            <Col span={6}>
                <ListingSteps steps={steps} currentStep={currentStep}/>
            </Col>

            <Col span={18}>
                <CurrentStepComponent
                    onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
                    onPrev={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
                />
            </Col>
        </Row>
    )
}

export default SellerListingForm;