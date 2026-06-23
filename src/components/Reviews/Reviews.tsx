import React from 'react'
import styles from './Reviews.module.scss';
import cn from 'classnames'
import { ReviewsList } from './ReviewsList';
import { ReviewsHeader } from './ReviewsHeader';

type PropsType = {
    id: string, 
};

export const Reviews: React.FC<PropsType> = ({id}) => {
    return (
        <section className={cn(styles.Reviews, 'container')}>
            <ReviewsHeader id={id} />
            <ReviewsList id={id}/>
        </section>
    )
}
