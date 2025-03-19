'use client'

import React, { useState } from 'react'
import styles from './AddPopup.module.scss';
import { AddReviewForm } from '../AddReviewForm';
import cn from 'classnames'
import { Preloader } from '@/UI/Preloader';

export type OperationStatusType = 'pending' | 'success' | 'failure' | 'none'

type PropsType = {
	isShowing: boolean,
	movieId: string,
}


export const AddPopup: React.FC<PropsType> = ({isShowing, movieId}) => {
	const [operationStatus, setOperationStatus] = useState<OperationStatusType>('none')


	console.log('curr operation status', operationStatus);  
	return (
		<div className={cn(styles.AddPopup, isShowing ? styles._show : '')}>
			<div className={styles.body}>
				<div className={styles.top}>
					<h4 className={styles.title}>Додати відгук</h4>
					<button className={styles.closeBtn}>x</button>
				</div>
				{operationStatus === 'none' ?
					<AddReviewForm 
						movieId={movieId} 
						setOperationStatus={setOperationStatus}
					/>
				: operationStatus === 'pending' ?
					<Preloader />
				: operationStatus === 'success' ?
					<>Успіх</>
				: 
					<>Фаілюре</>
				}
			</div>
		</div>
	)
}
