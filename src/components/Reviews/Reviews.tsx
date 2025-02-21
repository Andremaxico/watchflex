// 'use client'

import React, { useEffect, useState } from 'react'
import styles from './Reviews.module.scss';
import { axiosInstance } from '@/lib/axios';
import { Review } from './Review';
import { RequestReviewsResponseDataModel } from '@/models';
import cn from 'classnames'
import { AddPopup } from './AddPopup';
import { useBodyStore } from '@/store/useBodyStore';

type PropsType = {
    id: string
};

const getReviews = async (id: string) => {
    const response = await axiosInstance.get(`/api/movie/${id}/reviews`);

    const data = response.data;

    return data;
}

export const Reviews: React.FC<PropsType> = async ({id}) => {
    // const [isAddReview  PopupShowing, setIsAddReviewPopupShowing] = useState<boolean>(false);
    const reviews = await getReviews(id) as RequestReviewsResponseDataModel;

    // const handleClick = () => {
    //     const currStatus = isAddReviewPopupShowing;
    //     setIsAddReviewPopupShowing(currStatus);   
    // }

    console.log(reviews);

    return (
        <section className={cn(styles.Reviews, 'container')}>
            <div className={styles.top}>
                <h3 className={styles.title}>Відгуки</h3>
                <button className={styles.addReviewBtn}>+</button>
            </div>
            <div className={styles.reviewsList}>
                { reviews.results.length > 0 ?
                    reviews.results.map(data => (
                        <Review data={data} key={data.id}/>
                    ))
                :
                    <p className={styles.noText}>Коментарів ще немає</p>
                }
            </div>
            {/* <AddPopup isShowing={isAddReviewPopupShowing} /> */}
        </section>
    )
}
