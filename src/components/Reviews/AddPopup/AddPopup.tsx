'use client'

import React, { useEffect, useState } from 'react'
import styles from './AddPopup.module.scss';
import { AddReviewForm } from '../AddReviewForm';
import cn from 'classnames'
import { Preloader } from '@/UI/Preloader';

export type OperationStatusType = 'pending' | 'success' | 'failure' | 'none'

type PropsType = {
	isShowing: boolean,
	movieId: string,
	closePopup: () => void,
}


export const AddPopup: React.FC<PropsType> = ({isShowing, movieId, closePopup}) => {
	const [operationStatus, setOperationStatus] = useState<OperationStatusType>('none')

	useEffect(() => {
		if(operationStatus === 'failure' || operationStatus === 'success') {
			setTimeout(() => {
				closePopup(); 
			}, 1000)
		}
	}, [operationStatus])

	console.log('is showing', isShowing);  
	return (
		<div className={cn(styles.AddPopup, isShowing ? styles._show : '')}>
			<div className={styles.body}>
				<div className={styles.top}>
					<h4 className={styles.title}>Додати відгук</h4>
					<button 
						className={styles.closeBtn}
						onClick={closePopup}
					>
						x
					</button>
				</div>
				{operationStatus === 'none' ?
					<AddReviewForm 
						movieId={movieId} 
						setOperationStatus={setOperationStatus}
					/>
				: operationStatus === 'pending' ?
					<Preloader />
				: operationStatus === 'success' ?
					<>Успішно доданий</>
				: 
					<>Сталася помилка. Інформацію знайдіть у консолі</>
				}
			</div>
		</div>
	)
}
