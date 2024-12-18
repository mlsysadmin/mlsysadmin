import React from 'react';
import { Result } from 'antd';
import '../../styles/Error.css';
import SemiRoundBtn from '../custom/buttons/SemiRoundBtn.custom';
import { useNavigate } from 'react-router-dom';

import NotFoundImage from "../../asset/not-found-transparent.png";


const NotFoundComponent = () => {
    const navigate = useNavigate();

    return (
        <Result
            icon={
                <>
                    <div className="not-found--img-wrapper">
                        <img src={NotFoundImage} className='not-found--img' />
                    </div>
                </>
            }
            className='error-page'
            title={<></>}
            extra={
                <>
                    <p className="not-found-suggestion">
                        It might have been moved, deleted, or the URL might be incorrect.
                    </p>
                    <div className="not-found-links">
                        <a href="/" className="not-found-link not-found--home">Go to Homepage</a>
                        <a href="mailto:properties@mlhuillier.com" className="not-found-link not-found--contact">Contact Support</a>
                    </div>
                </>
            }
        />
    )
}
export default NotFoundComponent;