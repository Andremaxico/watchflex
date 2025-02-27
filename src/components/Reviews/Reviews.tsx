'use client'

import React, { use, useState } from 'react'
import styles from './Reviews.module.scss';
import { axiosInstance } from '@/lib/axios';
import { Review } from './Review';
import { RequestReviewsResponseDataModel } from '@/models';
import cn from 'classnames'
import { AddPopup } from './AddPopup';
import { useBodyStore } from '@/store/useBodyStore';
import { ReviewsList } from './ReviewsList';

type PropsType = {
    id: string, 
};

export const Reviews: React.FC<PropsType> = async ({id}) => {
    const [isAddReviewPopupShowing, setIsAddReviewPopupShowing] = useState<boolean>(false);


    const handleClick = () => {
        const currStatus = isAddReviewPopupShowing;
        setIsAddReviewPopupShowing(currStatus);   
    }

    return (
        <section className={cn(styles.Reviews, 'container')}>
            <div className={styles.top}>
                <h3 className={styles.title}>Відгуки</h3>
                <button className={styles.addReviewBtn} onClick={handleClick}>+</button>
            </div>
            <ReviewsList id={id}/>
            <AddPopup isShowing={isAddReviewPopupShowing} movieId={id} />
        </section>
    )
}
