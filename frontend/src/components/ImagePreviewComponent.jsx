import React from 'react';
import '../styles/imagePreview.css';

const ImagePreviewComponent = () => {
    return (
        <div className="preview-image--container">
            <div className="preview-image-side">
                {/* Single image on one side */}
                <div className="preview-image-side--wrapper">
                    <img src="https://qa.mlhuilierpropertiesportal.com//image/PropertyPhoto/PropertyPhoto_260.jfif" alt="Image 1" className="preview-single-image" />
                </div>
            </div>
            <div className="preview-image-group">
                {/* Four images on the other side */}
                <div className='preview-group-image--wrapper'>
                    <img src="https://qa.mlhuilierpropertiesportal.com//image/PropertyPhoto/PropertyPhoto_260.jfif" alt="Image 2" className="preview-group-image" />
                </div>
                <div className='preview-group-image--wrapper'>
                    <img src="https://qa.mlhuilierpropertiesportal.com//image/PropertyPhoto/PropertyPhoto_260.jfif" alt="Image 2" className="preview-group-image" />
                </div>
                <div className='preview-group-image--wrapper'>
                    <img src="https://qa.mlhuilierpropertiesportal.com//image/PropertyPhoto/PropertyPhoto_260.jfif" alt="Image 2" className="preview-group-image" />
                </div>
                <div className='preview-group-image--wrapper'>
                    <img src="https://qa.mlhuilierpropertiesportal.com//image/PropertyPhoto/PropertyPhoto_260.jfif" alt="Image 2" className="preview-group-image" />
                </div>
            </div>
        </div>
    );
};

export default ImagePreviewComponent;
