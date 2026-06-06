'use client'

import React, { forwardRef } from 'react';
import styles from './SearchInput.module.scss';
import { useSearchStore } from '@/store/useSearchStore';

type PropsType = {};

export const SearchInput = forwardRef<HTMLInputElement, PropsType>(({}, ref) => {
	const { searchQuery, setSearchQuery } = useSearchStore(); 

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setSearchQuery(value);
	}

	return (
		<input 
			placeholder='Шукайте тут'
			className={styles.SearchInput}
			ref={ref}
			value={searchQuery}
			onInput={handleInput}
		/>
	)
})
