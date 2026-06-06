'use client'

import React, { useEffect, useRef } from 'react'
import { Logo } from './Logo';
import styles from './Header.module.scss';
import { Auth } from './Auth';
import cn from 'classnames'
import { Search } from './Search';
import { CloseBtn } from './Search/CloseBtn';
import { useHeaderStore } from '@/store/useHeaderStore';

type PropsType = {};

export const Header: React.FC<PropsType> = ({ }) => {
	const ref = useRef<HTMLHeadElement>(null); // for the calculatings in other components
	const setHeaderHeight = useHeaderStore((store) => store.setHeaderHeight);

	useEffect(() => {
		const height = ref.current?.offsetHeight || 0;

		setHeaderHeight(height)
	})

	return (
		<header className={styles.Header} ref={ref}>
			<div className={cn(styles.container, "container")}>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.search}>
					<Search />
				</div>
				<div className={styles.auth}>
					<Auth />
				</div>
			</div>
		</header>
	)
}
