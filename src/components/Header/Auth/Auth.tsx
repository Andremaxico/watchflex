'use client';

import React, { useEffect, useState } from 'react';
import styles from './Auth.module.scss';
import { LoginButton } from './LoginButton';
import { ProfileIcon } from './ProfileIcon';
import { LoginPopup } from './LoginPopup';
import { ActionStatus } from '@/UI/ActionStatus/ActionStatus';
import { ActionStatusType } from '@/types';
import { useSearchParams } from 'next/navigation';
import { RequestTokenViewModel } from '@/models';
import { NextRouter, useRouter } from 'next/router';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { handleDecryption } from '@/utils/server/decryptData';
import { useAuthStore } from '@/store/useAuthStore';
import { handleEncryption } from '@/utils/server/encryptData';

type PropsType = {};


//it's just more logical to put this function here
const authUser = async (router: AppRouterInstance): Promise<boolean> => {
	let requestTokenData = null;

	const response = await fetch('/api/auth', {
		method: 'GET',
	});

	const data: RequestTokenViewModel = await response.json();

	console.log(data);

	if(data.requestToken) {
		requestTokenData = data;
	} else {
		return false;
	}

	//update localStorage
	localStorage.setItem('request_token_data', JSON.stringify(requestTokenData));

	//redirect user to approve page
	router.push(`https://www.themoviedb.org/authenticate/${requestTokenData.requestToken}?redirect_to=${process.env.BASE_URL}`);

	return true;
}

export const Auth: React.FC<PropsType> = () => {
	const [requestTokenData, setRequestTokenData] = useState<RequestTokenViewModel | null>(null);
	const [sessionId, setSessionId] = useState<string | null>(null);
	//for informing user about actions and better ux
	const [actionStatus, setActionStatus] = useState<ActionStatusType | null>(null);
	const [isAuthed, setIsAuthed] = useState<boolean>(false);

	const { iv, setIV } = useAuthStore();

	//once sessionId is generated -> set it to local storage
	useEffect(() => {
		if(sessionId) {
			(async () => {
				const {encryptedData, initVector} = await handleEncryption(sessionId);
				setIV(initVector);
				localStorage.setItem('session_id', encryptedData);
			})()	
		}
	}, [sessionId]) 

	useEffect(() => {
		//TODO:
		//do a greater check is id valid

		const id = localStorage.getItem('session_id');
		(async () => {
			const decryptedId = await handleDecryption({ id, iv });
			setSessionId(decryptedId);
		})()
	}, [localStorage.getItem('session_id')])

	useEffect(() => {
		if(sessionId) {
			setIsAuthed(true);
		}

	}, [sessionId])

	return (
		<div className={styles.Auth}>
			{!!actionStatus && <ActionStatus status={actionStatus} />}
			{isAuthed ? 
				<ProfileIcon />
			:  
				<LoginButton 
					setActionStatus={setActionStatus} 
					authUser={authUser}
					setRequestTokenData={setRequestTokenData}
					setSessionId={setSessionId}
				/>
			}
			{/* <LoginPopup 
				isShow={isLoginPopupShow} 
				setIsShow={setIsLoginPopupShow}
			/> */}
		</div>
	)
}
