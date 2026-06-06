'use client'

import React, { useEffect, useState } from 'react';
import styles from './CloseBtn.module.scss';
import cn from 'classnames'
import { useSearchStore } from '@/store/useSearchStore';
import { useWindowWidth } from '@/hooks/useWindowWidth';

type PropsType = {};

export const CloseBtn: React.FC<PropsType> = ({ }) => {
	//TODO: must be show when input is not empty
	const { isSearchInputShow, hide, searchQuery } = useSearchStore();

	const windowWidth = useWindowWidth();
	const isShown = searchQuery.length > 0 && (windowWidth !== undefined && windowWidth <= 768 ? isSearchInputShow : true)


	const handleClick = () => {
		hide();

	};

	return (
		<button className={cn(styles.CloseBtn, isShown ? styles._show : '')} onClick={handleClick}>
			x
		</button>
	)
}
