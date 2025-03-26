'use client';

import React, { useEffect, useState } from 'react';
import styles from './LoginButton.module.scss';
import { RequestTokenViewModel } from '@/models';
import { useRouter, useSearchParams } from 'next/navigation';
import { ActionStatusType } from '@/types';

type PropsType = {
	setActionStatus: (v: ActionStatusType | null) => void,
	authUser: () => Promise<boolean>,
	setRequestTokenData: (value: RequestTokenViewModel | null) => void,
};

export const LoginButton: React.FC<PropsType> = ({setActionStatus, authUser, setRequestTokenData}) => {
	const [isTokenApproved, setIsTokenApproved] = useState<boolean>(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	console.log(setActionStatus);

	//get request token
	const handleClick = async () => {
		setActionStatus('loading');

		const success = await authUser();

		if(!success) {
			setActionStatus('error');
		}
	}

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
