import React from 'react'
import styles from './AddPopup.module.scss';
import { AddReviewForm } from '../AddReviewForm';
import cn from 'classnames'

type PropsType = {
	isShowing: boolean,
	movieId: string,
}

export const AddPopup: React.FC<PropsType> = ({isShowing, movieId}) => {
	return (
		<div className={cn(styles.AddPopup, isShowing ? styles._show : '')}>
			<div className={styles.body}>
				<div className={styles.top}>
					<h4 className={styles.title}>Додати відгук</h4>
					<button className={styles.closeBtn}>x</button>
				</div>

				<AddReviewForm movieId={movieId} />
			</div>
		</div>
	)
}
