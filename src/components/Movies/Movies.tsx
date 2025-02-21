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
import { createPortal } from 'react-dom';
import { SearchButton } from './SearchButton/SearchButton';
import axios from 'axios';
import { useSearchStore } from '@/store/useSearchStore';
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

export const Movies: React.FC<PropsType>  = ({}) => {
	const params = useSearchParams();
	const router = useRouter();

	const page = Number(params.get('page')) || 1;

	const [searchBtnRef, setSearchBtnRef] = useState<Element | null>(null);
	const [moviesData, setMoviesData] = useState<MoviesDataType>();
	const [isFetching, setIsFetching] = useState<boolean>(false);
	//TODO: close search -> method - popular
	const [moviesSource, setMoviesSource] = useState<FiltersType | 'Search'>('Popular');

	const { isSearchInputShow, hide, show } = useSearchStore();


	//modify the url search params
	const changePage = (page: number) => {
		router.push(`/?page=${page || 1}`);
	}

	//change the state
	const setIsInputShow = (needToshow: boolean) => {
		if(needToshow) {
			show();
		} else {
			console.log('hude');
			hide();
		}
	}

	//general function for searching movies
	const searchMovies = async () => {
		setIsFetching(true);
		const searchQuery = localStorage.getItem('searchQuery');
		const data = await getMoviesByQuery(searchQuery || '', page);
		console.log(data);
		setIsFetching(false);
		//@ts-expect-error
		return data.error ? [] as MoviesDataType : data as MoviesDataType;
	}

	const handleSearchBtnClick = async () => {
		if(moviesSource !== 'Search') {
			setMoviesSource('Search');
		}
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


	useEffect(() => {
		console.log('is fetching', isFetching);
	}, [isFetching]);

	//need this use effect because
	//after invalid search movies count = 0, and page = 1
	//if we return to popular soure the page will be 1 again and page use effect won't be triggered
	useEffect(() => {
		console.log('change movies sourse');
		if(moviesSource !== 'Search') {
			(async () => {
				console.log('changed movies source');
				setIsFetching(true);
				//to hide previous results
				setMoviesData(undefined);
				const movies = await getMovies(page, moviesSource);
				console.log('get popular movies');
				setMoviesData(movies);
				setIsFetching(false);
			})();
		}
	}, [moviesSource]);

	useEffect(() => {
		if(!isSearchInputShow) {
			setMoviesSource('Popular');
		}
	}, [isSearchInputShow]);
	
	//when page loaded -> document is available
	useEffect(() => {
		if(document) {
			const el = document.getElementById('header_searchBtn') || document.body;

			setSearchBtnRef(el);
		}
	}, [])

	if(moviesData === undefined) {
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
							<MoviesList moviesData={moviesData.results}/>
						</Suspense>
					</div>
					<Pagination
						changePage={changePage}
						currPage={page}
						pagesNum={moviesData?.totalPages || 0}
					/>
				</>
			: moviesData?.results && moviesData.results.length === 0 ?
				<p>Фільмів не знайдено</p>
			: !isFetching ?
				<p>Eroкr</p>
			: <Preloader />
			}

			{/* using portal to trigger requests form this file */}
			{searchBtnRef && createPortal(
				<SearchButton
					isInputShow={isSearchInputShow} 
					setIsInputShow={setIsInputShow}
					getMovies={handleSearchBtnClick}
				/>,
				searchBtnRef
			)}
		</div>
	)
}
