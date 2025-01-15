import React, { useEffect, useState } from 'react';
import {
	useLocation,
	useNavigate
} from 'react-router-dom';

import { useAuth } from '../Context/AuthContext';
import { isCookiePresent } from '../utils/CookieChecker';
import { SupportOutlet } from '../pages';
import { searchKyc } from '../api/Public/User.api';
import Cookies from 'js-cookie';
import PreviewLoadingModal from '../components/modals/PreviewLoadingModal';


const ProtectedRoute = ({ element }) => {
	const { isAuthenticated, logout, userDeatils } = useAuth();

	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {

		if (!isAuthenticated) {
			console.log(
				"Redirecting to /support/signin due to failed authentication..."
			);
			sessionStorage.removeItem("previous_path");
			navigate("/support/signin", { replace: true });
		} else {
			sessionStorage.setItem("previous_path", location.pathname);
		}
	}, [isAuthenticated, userDeatils]);

	// Render the children components if the user is authenticated
	return element;
};


const BuyerSellerProtectedRoute = ({ element }) => {
	const {
		isAuthenticated,
		userDetails,
		setIsSeller,
		isSeller,
		setPageLoad,
		pageLoad,
	} = useAuth();
	const navigate = useNavigate();
	const loginPath = '/login';

	useEffect(() => {
		const checkRoute = async () => {
			console.log("checkRoute",isAuthenticated, userDetails);
			if (!isAuthenticated || !userDetails) {
				console.log('Redirecting to login due to missing cookies...');
				navigate(loginPath);
				return;
			}

			try {
				console.log('Checking cookies presence...');
				const res = await searchKyc(userDetails.mobileNumber);
				const kyc = res.data.data;
				const tierLabel = kyc.tier.label.toLowerCase();
				const allowedTier = ['employee', 'fully verified'];

				if (allowedTier.includes(tierLabel)) {
					setIsSeller(true);
				} else {
					console.log('User is not a seller. Redirecting to home.');
					navigate('/');
				}
			} catch (err) {
				console.error('Error during KYC check:', err);
				navigate(loginPath);
			} finally {
				setPageLoad(false);
			}
		};

		if (!pageLoad) {
			console.log("pageload", pageLoad);
			
			checkRoute();
		}
	}, [isAuthenticated, userDetails, pageLoad, navigate, setIsSeller, setPageLoad]);

	if (pageLoad) {
		return <PreviewLoadingModal />; // Show a loading indicator during checks
	}else{
		return element;
	}

	
};


export { ProtectedRoute, BuyerSellerProtectedRoute };
