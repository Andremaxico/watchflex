'use client'

import React, { useEffect, useState } from 'react'
import styles from './Reviews.module.scss';
import { AddPopup } from './AddPopup';

type PropsType = {
    id: string,
};

export const ReviewsHeader: React.FC<PropsType> = ({ id }) => {
    const [isAddReviewPopupShowing, setIsAddReviewPopupShowing] = useState<boolean>(false);

    useEffect(() => {
        if(isAddReviewPopupShowing) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.paddingRight = '0px';
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
        <>
            <div className={styles.top}>
                <h3 className={styles.title}>Відгуки</h3>
                <button className={styles.addReviewBtn} onClick={handleClick}>+</button>
            </div>
            <AddPopup 
                isShowing={isAddReviewPopupShowing} 
                movieId={id} 
                closePopup={closeAddReviewPopup}
            />
        </>
    )
}
