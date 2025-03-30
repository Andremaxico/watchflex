'use client';

import React, { useEffect, useState } from 'react';
import styles from './LoginButton.module.scss';
import { RequestTokenViewModel } from '@/models';
import { useRouter, useSearchParams } from 'next/navigation';
import { ActionStatusType } from '@/types';
import { NextRouter } from 'next/router';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type PropsType = {
	setActionStatus: (v: ActionStatusType | null) => void,
	authUser: (r: AppRouterInstance) => Promise<boolean>,
	setRequestTokenData: (value: RequestTokenViewModel | null) => void,
	setSessionId: (value: string | null) => void
};

//TODO:
//change type


//TODO:
//Write a encoder for the session_id to keep it in localstorage
const getSessionId = async (): Promise<any> => {
	const response = await fetch('/api/auth', {
		method: 'POST',
	});

	const json = await response.json();

	return json;
}

export const LoginButton: React.FC<PropsType> = ({setActionStatus, authUser, setRequestTokenData, setSessionId}) => {
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
		if(isTokenApproved) {
			(async () => {
				const sessionId = await getSessionId();
				console.log('got session id', sessionId);
				setSessionId(sessionId);
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
