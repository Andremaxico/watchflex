'use client';

import React, { useEffect, useState } from 'react';
import styles from './Auth.module.scss';
import { LoginButton } from './LoginButton';
import { ProfileIcon } from './ProfileIcon';
import { LoginPopup } from './LoginPopup';
import { ActionStatus } from '@/UI/ActionStatus/ActionStatus';
import { ActionStatusType } from '@/types';
import { useSearchParams } from 'next/navigation';

type PropsType = {};

export const Auth: React.FC<PropsType> = () => {
	const [isLoginPopupShow, setIsLoginPopupShow] = useState<boolean>(false);
	//for informing user about actions and better ux
	const [actionStatus, setActionStatus] = useState<ActionStatusType | null>(null);
	const [isAuthed, setIsAuthed] = useState<boolean>(false);

	const searchParams = useSearchParams();

	//TODO: change the way auth status is defined

	useEffect(() => {
		const approved: 'true' | 'false' | null = searchParams.get('approved') as 'true' | 'false' | null;

		console.log('approved', approved);

		switch (approved) {
			case 'false':
				setIsAuthed(false);
				break;
			case 'true':
				setIsAuthed(true);
				break;
		}
	}, [searchParams.get('approved')])

	return (
		<div className={styles.Auth}>
			{!!actionStatus && <ActionStatus status={actionStatus} />}
			{isAuthed ? 
				<ProfileIcon />
			:  
				<LoginButton setActionStatus={setActionStatus} />
			}
			{/* <LoginPopup 
				isShow={isLoginPopupShow} 
				setIsShow={setIsLoginPopupShow}
			/> */}
		</div>
	)
}
