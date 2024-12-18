import React from 'react';
import { Result } from 'antd';
import '../../styles/Error.css';
import SemiRoundBtn from '../custom/buttons/SemiRoundBtn.custom';
import { useNavigate } from 'react-router-dom';


const NotFoundComponent = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Oops! The page you're looking for doesn't exist."
            className='error-page'
            extra={
                // <SemiRoundBtn
                //     type="primary"
                //     label={'Back Home'}
                //     size={'large'}
                //     style={{
                //         backgroundColor: '#D90000'
                //     }}
                //     handleClick={() => navigate('/')}
                //     className={'not-found--btn'}
                // />
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