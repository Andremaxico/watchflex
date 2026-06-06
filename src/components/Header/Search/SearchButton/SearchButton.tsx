import React from 'react';
import styles from './SearchButton.module.scss';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { ErrorReturnType, MoviesDataType } from '@/types';

type PropsType = {
	getMovies: () => void,
	isInputShow: boolean,
	setIsInputShow: (value: boolean) => void,
};




export const SearchButton: React.FC<PropsType> = ({ isInputShow, setIsInputShow, getMovies }) => {
	const handleClick = async () => {
		if (!isInputShow) {
			setIsInputShow(true);
		} else {
			getMovies();
		}
	}


	return (
		//TODO:on typing -> show predictions
		<button className={styles.SearchButton} onClick={handleClick}>
			<CiSearch className={styles.icon} />
		</button>
	)
}
