import React from "react";
import "../../../styles/submitapplicationcustom.css"

const SubmitApplicationCustom = () => {
    return (
        <div className="divs-btn-group">
            <button type="primary" className="submit-btn">Submit</button><br />
            <span>By submitting, I agree my information may be shared and that I may be contacted at this number including through emails. I agree to the privacy policy and terms.</span>
        </div>
    );
}

export default SubmitApplicationCustom