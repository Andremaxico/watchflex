import React from 'react';
import styles from './MoviesList.module.scss';
import { MovieDataType } from '@/types';
import { MovieCard } from './MovieCard/MovieCard';
import { axiosInstance } from '@/lib/axios';

type PropsType = {
	moviesData: MovieDataType[],
};



export const MoviesList: React.FC<PropsType> = ({moviesData}) => {
	console.log('encryption key', process.env.ENCRYP, process.env.BASE_URL, process.env.NEW_VAR);
	return (
		<section className={styles.MoviesList}>
			{moviesData.map(data => (
				<MovieCard data={data} key={data.id}/>
			))}
		</section>
	)
}

