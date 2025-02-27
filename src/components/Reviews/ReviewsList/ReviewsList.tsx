import { axiosInstance } from '@/lib/axios';
import styles from './ReviewsList.module.scss';
import { RequestReviewsResponseDataModel } from '@/models';
import React, { cache } from 'react'
import { Review } from '../Review/Review';

type PropsType = {
	id: string
}

const getReviews = cache(async (id: string) => {
	const response = await axiosInstance.get(`/api/movie/${id}/reviews`);

	const data = response.data;

	return data;
})

export const ReviewsList: React.FC<PropsType> = async ({id}) => {    
	const reviewsData = await getReviews(id) as RequestReviewsResponseDataModel;

	return (
		<div className={styles.ReviewsList}>
			{ reviewsData.results.length > 0 ?
				reviewsData.results.map(data => (
					<Review data={data} key={data.id}/>
				))
			:
				<p className={styles.noText}>Коментарів ще немає</p>
			}
		</div>
	)
}
