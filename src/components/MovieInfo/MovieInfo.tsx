import React from 'react'
import styles from './MovieInfo.module.scss';
import { MovieDataType, MovieDetailsType } from '@/types';
import { Title } from './Title/Title';
import { Describtion } from './Describtion/Describtion';
import cn from 'classnames';

type PropsType = {
    details: MovieDetailsType,
}

export const MovieInfo: React.FC<PropsType> = ({details}) => {
    const { title, genres, adult, overview, vote_average, vote_count, poster_path, budget } = details;

    const genresNames = genres.map(genre => genre.name); 

    console.log('movi info rerender');

    return (
        <div className={cn(styles.MovieInfo, 'container')}>
            <Title>{title}</Title>
            <Describtion 
                text={overview}
                posterUrl={poster_path}
                rating={vote_average}
                genresNames={genresNames}
                budget={budget}
            />
        </div>
    )
}
