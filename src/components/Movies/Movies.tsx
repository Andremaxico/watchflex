'use client'

import React, { Suspense, useEffect, useState } from 'react';
import styles from './Movies.module.scss';
import { MoviesList } from '../MoviesList';
import { axiosInstance } from '@/lib/axios';
import { ErrorReturnType, MovieDataType, MoviesDataType } from '@/types';
import { Preloader } from '@/UI/Preloader';
import { Pagination } from './Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import axios from 'axios';
import { useSearchStore } from '@/store/useSearchStore';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { Filters } from '../Filters';
import { FiltersType } from '../Filters/Filters';
import { Header } from '../Header';

type PropsType = {};

const getMovies = async (page: number, source: FiltersType): Promise<MoviesDataType | undefined> => {
	const endpoint = source.toLowerCase().replaceAll(' ', '_');
	const res = await axiosInstance.get(`/api/movies/${endpoint}?page=${page}`);

	const data = res.data as MoviesDataType | undefined;

	return res.data.error ? undefined : data;
}

const getMoviesByQuery = async (query: string, page: number) => {
	const moviesData = await axiosInstance.get(`/api/movies/search/${query}?page=${page}`);

	return moviesData.data as MoviesDataType | ErrorReturnType;
}

export const Movies: React.FC<PropsType> = ({ }) => {
	const params = useSearchParams();
	const router = useRouter();

	const page = Number(params.get('page')) || 1;

	const [moviesData, setMoviesData] = useState<MoviesDataType>();
	const [isFetching, setIsFetching] = useState<boolean>(false);
	//TODO: close search -> method - popular
	const [moviesSource, setMoviesSource] = useState<FiltersType | 'Search'>('Popular');

	const { isSearchInputShow, searchTrigger, searchQuery } = useSearchStore();
	const windowWidth = useWindowWidth();
	const isMobile = windowWidth !== undefined ? windowWidth <= 768 : false;

	useEffect(() => {
		if (searchTrigger > 0) {
			handleSearchBtnClick();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTrigger]);


	//modify the url search params
	const changePage = (page: number) => {
		router.push(`/?page=${page || 1}`);
	}

	//general function for searching movies
	const searchMovies = async () => {
		setIsFetching(true);

		const data = await getMoviesByQuery(searchQuery || '', page);

		setIsFetching(false);
		//@ts-expect-error
		return data.error ? [] as MoviesDataType : data as MoviesDataType;
	}

	const handleSearchBtnClick = async () => {
		if (moviesSource !== 'Search') {
			setMoviesSource('Search');
		}
		//TODO: dont change page if we are on 1 page
		changePage(1);
		const movies = await searchMovies();
		setMoviesData(movies);
	}

	//page chnages -> request new movies
	useEffect(() => {
		console.log('request movies');
		(async () => {
			setIsFetching(true);
			const fetchedData =
				moviesSource !== 'Search' ? await getMovies(page, moviesSource)
					:
					await searchMovies();
			;

			setMoviesData(fetchedData);
			setIsFetching(false);
		})();
	}, [page]);

	//need this use effect because
	//after invalid search movies count = 0, and page = 1
	//if we return to popular soure the page will be 1 again and page use effect won't be triggered
	useEffect(() => {
		if (moviesSource !== 'Search') {
			(async () => {
				setIsFetching(true);
				//to hide previous results
				setMoviesData(undefined);
				const movies = await getMovies(page, moviesSource);

				setMoviesData(movies);
				setIsFetching(false);
			})();
		}
	}, [moviesSource]);

	useEffect(() => {
		if (((isMobile && !isSearchInputShow) || searchQuery === '') && moviesSource === 'Search') {
			setMoviesSource('Popular');
		}
	}, [isSearchInputShow, searchQuery, isMobile]);



	if (moviesData === undefined) {
		//show error
	}

	//TODO: add "not found" when searching movies

	return (
		<div className={styles.Movies}>
			<div className={styles.filters}>
				<Filters
					activeFilter={moviesSource !== 'Search' ? moviesSource : null}
					setActive={setMoviesSource}
				/>
			</div>
			{moviesData?.results && moviesData.results.length > 0 ?
				<>
					<div className={styles.list}>
						<Suspense fallback={<Preloader />}>
							<MoviesList moviesData={moviesData.results} />
						</Suspense>
					</div>
					<Pagination
						changePage={changePage}
						currPage={page}
						pagesNum={moviesData?.totalPages || 0}
					/>
				</>
				: moviesData?.results && moviesData.results.length === 0 ?
					<p>
						Фільмів не знайдено
					</p>
					: !isFetching ?
						<p>Помилка</p>
						: <Preloader />
			}
		</div>
	)
}
