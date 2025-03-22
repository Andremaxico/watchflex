'use client'

import React, { useEffect, useState } from 'react'
import styles from './Reviews.module.scss';
import cn from 'classnames'
import { AddPopup } from './AddPopup';
import { ReviewsList } from './ReviewsList';

type PropsType = {
    id: string, 
};


export const Reviews: React.FC<PropsType> = async ({id}) => {
    const [isAddReviewPopupShowing, setIsAddReviewPopupShowing] = useState<boolean>(false);

    useEffect(() => {
        if(isAddReviewPopupShowing) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'visible'
        }
    }, [isAddReviewPopupShowing])

    const closeAddReviewPopup = () => {
        setIsAddReviewPopupShowing(false);
    }

    const handleClick = () => {
        setIsAddReviewPopupShowing(true);   
    }

    return (
        <section className={cn(styles.Reviews, 'container')}>
            <div className={styles.top}>
                <h3 className={styles.title}>Відгуки</h3>
                <button className={styles.addReviewBtn} onClick={handleClick}>+</button>
            </div>
            <ReviewsList id={id}/>
            <AddPopup 
                isShowing={isAddReviewPopupShowing} 
                movieId={id} 
                closePopup={closeAddReviewPopup}
            />
        </section>
    )
}
