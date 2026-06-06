'use client'

import React, { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton/SearchButton';
import cn from 'classnames'
import { useSearchStore } from '@/store/useSearchStore';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { CloseBtn } from './CloseBtn';

type PropsType = {};

export const Search: React.FC<PropsType> = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

	const { isSearchInputShow, hide, show, triggerSearch } = useSearchStore();

	const windowWidth = useWindowWidth();
	const isMobile = windowWidth !== undefined ? windowWidth <= 768 : false;
	const isInputShown = isMobile ? isSearchInputShow : true;

	//manual focus on input, because box is bigger and has input appereance
	const handleClick = () => {
		//TODO: change in localstorage
		inputRef.current && inputRef.current.focus();
		inputRef.current && setIsInputFocused(true);
	}

	const inputFocusoutHandler = () => {
		setIsInputFocused(false);
	}

	useEffect(() => {
		const inputEl = inputRef.current;
		inputEl?.addEventListener('focusout', inputFocusoutHandler);

		return () => {
			inputEl?.removeEventListener('focusout', inputFocusoutHandler);
		}
	}, [])

	return (
		<div className={cn(styles.Search, isInputFocused ? styles._focused : '')} onClick={handleClick}>
			<div className={cn(styles.input, isInputShown ? styles._show : '')}>
				<SearchInput ref={inputRef} />
			</div>
			<div className={styles.searchBtn}>
				<SearchButton
					isInputShow={isInputShown}
					setIsInputShow={(value) => {
						if (isMobile) {
							value ? show() : hide();
						}
					}}
					getMovies={triggerSearch}
				/>
			</div>
			<div className={styles.closeBtn}>
				<CloseBtn />
			</div>
		</div>
	)
}
