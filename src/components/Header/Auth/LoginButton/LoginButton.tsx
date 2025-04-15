'use client';

import React, { useEffect, useState } from 'react';
import styles from './LoginButton.module.scss';
import { RequestTokenViewModel } from '@/models';
import { useRouter, useSearchParams } from 'next/navigation';
import { ActionStatusType } from '@/types';
import { NextRouter } from 'next/router';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { axiosInstance } from '@/lib/axios';

type PropsType = {
	setActionStatus: (v: ActionStatusType | null) => void,
	authUser: (r: AppRouterInstance) => Promise<boolean>,
	setRequestTokenData: (value: RequestTokenViewModel | null) => void,
	setSessionId: (value: string | null) => void,
	requestToken?: string,
};

//TODO:
//change type


//TODO:
//Write a encoder for the session_id to keep it in localstorage
const getSessionId = async (requestToken: string,): Promise<any> => {
	const response = await fetch('/api/auth', {
		method: 'POST',
		//server needs request_token in this name
		body: JSON.stringify({ request_token: requestToken }),
	});

	const data = await response.json();

	console.log('get session id response', data);

	if(!data.success) {
		return null;
	}

	return data;
}

export const LoginButton: React.FC<PropsType> = ({setActionStatus, authUser, setRequestTokenData, setSessionId, requestToken}) => {
	const [isTokenApproved, setIsTokenApproved] = useState<boolean>(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	console.log(setActionStatus);

	//get request token
	const handleClick = async () => {
		setActionStatus('loading');

		const success = await authUser(router);

		if(!success) {
			setActionStatus('error');
		}
	}

	//set approved status
	useEffect(() => {
		const currTokenData = JSON.parse(localStorage.getItem('request_token_data') || '');

		if(searchParams.get('approved') && searchParams.get('request_token')) {
			setActionStatus('success');
			setTimeout(() => {
				setActionStatus(null);
			}, 2000)
			setIsTokenApproved(true);

		}

		if(currTokenData !== null && currTokenData !== undefined) {
			setRequestTokenData({
				...currTokenData, approved: true
			});
		} else {
			setRequestTokenData(null)
		}
	}, [searchParams]);

	useEffect(() => {
		if(isTokenApproved && requestToken) {
			(async () => {
				const sessionId = await getSessionId(requestToken);
				
				if(sessionId) {
					setSessionId(sessionId);
				} else {
					//TODO:
					//show error
				}

				router.push(process.env.BASE_URL || '');
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
