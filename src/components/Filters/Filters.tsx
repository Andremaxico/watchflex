'use client';

import React, { useState } from 'react';
import styles from './Filters.module.scss';
import cn from 'classnames'

export type FiltersType = 'Popular' | 'Now Playing' | 'Top Rated' | 'Upcoming';
export type LanguagesType = 'uk'
export type TranslatesType = {[index in FiltersType]: {[index in LanguagesType]: string}}

type PropsType = {
	activeFilter: FiltersType | null,
	setActive: (filter: FiltersType) => void,
}

export const Filters: React.FC<PropsType> = ({activeFilter, setActive}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const filtersNames: FiltersType[] = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

	const toggleOpenState = () => {
		setIsOpen(!isOpen);
	}

	const translatesObj: TranslatesType = {
		"Now Playing": {
			'uk': 'Зараз дивляться'
		},
		'Popular': {
			'uk': 'Популярне'
		},
		'Top Rated': {
			'uk': 'З найкращим рейтингом'
		},
		'Upcoming': {
			'uk': 'Скоро будуть'
		}
	}

	const changeActive = (filter: FiltersType) => {
		setActive(filter);
		setTimeout(() => {
			setIsOpen(false);
		}, 100)
	}

	return (
		<div className={styles.Filters}>
			<div 
				className={cn(styles.burger, isOpen ? styles._open : '')}
				onClick={toggleOpenState}
			>
				<div className={styles.line}></div>
			</div>
			<li className={cn(styles.list, isOpen ? styles._open : '')}>
				{filtersNames.map(name => (
					<ul 
						className={cn(
							styles.filterName, 
							name === activeFilter ? styles._active : ''
						)}
						onClick={() => changeActive(name)}
						key={name}
					>
						{translatesObj[name].uk}
					</ul>
				))}
			</li>
		</div>
	)
}
