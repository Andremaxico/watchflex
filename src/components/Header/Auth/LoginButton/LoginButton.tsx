'use client';

import React, { useEffect, useState } from 'react';
import styles from './LoginButton.module.scss';
import { RequestTokenViewModel } from '@/models';
import { useRouter, useSearchParams } from 'next/navigation';
import { ActionStatusType } from '@/types';

type PropsType = {
	setActionStatus: (v: ActionStatusType | null) => void,
	//requestLogin: () => void,
};

export const LoginButton: React.FC<PropsType> = ({setActionStatus}) => {
	const [requestTokenData, setRequestTokenData] = useState<RequestTokenViewModel | null>(null);
	const [isTokenApproved, setIsTokenApproved] = useState<boolean>(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	console.log(setActionStatus);

	//get request token
	const handleClick = async () => {
		setActionStatus('loading');
		const response = await fetch('/api/auth', {
			method: 'GET',
		});

		const data: RequestTokenViewModel = await response.json();

		console.log(data);

		if(data.requestToken) {
			setRequestTokenData(data);
		} else {
			setActionStatus('error');
		}
	}

	//update localStorage
	useEffect(() => {
		localStorage.setItem('request_token_data', JSON.stringify(requestTokenData));
	}, [requestTokenData?.requestToken])

	//redirect user to approve page
	useEffect(() => {
		if(requestTokenData?.requestToken && !requestTokenData.approved) {
			router.push(`https://www.themoviedb.org/authenticate/${requestTokenData.requestToken}?redirect_to=${process.env.BASE_URL}`);
		}
	}, [requestTokenData?.requestToken]);

	//set approved status
	useEffect(() => {
		const currTokenData = JSON.parse(localStorage.getItem('request_token_data') || '');

		if(searchParams.get('approved') && searchParams.get('request_token')) {
			console.log(setActionStatus)
			setActionStatus('success');
			setTimeout(() => {
				setActionStatus(null);
			}, 2000)
			setIsTokenApproved(true);
		}

		setRequestTokenData({
			...currTokenData, approved: true
		});
	}, [searchParams]);

	useEffect(() => {
		if(isTokenApproved) {
			(async () => {
				const response = await fetch('/api/auth', {
					method: 'POST',
				});

				const json = await response.json();

				console.log('json with session id', json);
			})()
		}
	}, [isTokenApproved])

	//TODO:
	// get user data after auth

	return (
		<button 
			className={styles.LoginButton} 
			onClick={handleClick}
		>
			Увійти
		</button> 		
	)
}
