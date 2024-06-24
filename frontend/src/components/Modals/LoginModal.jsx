import React, { useState } from 'react';
import '../../styles/modals/LoginModal.css';
import logo from '../../assets/red-ml-logo.png';
import google from '../../assets/icons/logreg/google-icon.png';
import apple from '../../assets/icons/logreg/apple-icon.png';

const LoginModal = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowLoginModal(true)}>Log In</button>
      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleLoginModalClose}>&times;</span>
            <div className="logo"><img src={logo} alt="M Lhuillier Logo" /></div>
            <h1 className="MLheader">Welcome to M Lhuillier Brokerage</h1>
            <div className="input-group">
              <input className="input" type="email" placeholder="Enter Email Address" />
            </div>
            <div className="input-group">
              <input className="input" type="password" placeholder="Enter Password" />
            </div>
            <button className="button">LOGIN</button>
            <div className="forgot-password">
              <a className="forgot-password-link" href="#">Forgot your password?</a>
            </div>
            <div className="connect-with">or connect with</div>
            <div className="social-login">
              <button className="social-button">
                <img src={google} alt="Google" /> Continue with Google
              </button>
              <button className="social-button">
                <img src={apple} alt="Apple" /> Continue with Apple
              </button>
            </div>
            <div className="signup">
              Don't have an account? <a className="signup-link" href="#">Sign up</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
