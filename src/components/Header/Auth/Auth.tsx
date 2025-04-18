'use client';

import React, { useEffect, useState } from 'react';
import styles from './Auth.module.scss';
import { LoginButton } from './LoginButton';
import { ProfileIcon } from './ProfileIcon';
import { ActionStatus } from '@/UI/ActionStatus/ActionStatus';
import { ActionStatusType } from '@/types';
import { RequestTokenViewModel } from '@/models';
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
				const {encryptedData, initVector, cryptoKey} = await handleEncryption(sessionId);
				localStorage.setItem('init_vector', initVector);
				localStorage.setItem('session_id', encryptedData);
			})()	
		}
	}, [sessionId]) 

	//set session id to local STORE from local Storage
	useEffect(() => {

		//TODO:
		//do a greater check is id valid
		const id = localStorage.getItem('session_id');
		const iv = localStorage.getItem('init_vector');
		console.log('session id from loocal storage', id);
		if(id && iv) {
			(async () => {
				console.log('encryption key before function', process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
				const decryptedId = await handleDecryption({ initVector: iv, encryptedData: id });
				console.log('decrypted idd', decryptedId);
				setSessionId(decryptedId);
			})()
		} else {
			console.error('no session id or iv');
		}
	}, [])

	//change authesd status
	useEffect(() => {
		console.log('curr session id', sessionId);
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
					requestToken={requestTokenData?.requestToken}
				/>
			}
			{/* <LoginPopup 
				isShow={isLoginPopupShow} 
				setIsShow={setIsLoginPopupShow}
			/> */}
		</div>
	)
}
