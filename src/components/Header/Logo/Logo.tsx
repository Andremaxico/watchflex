import Image from 'next/image'
import React from 'react'
import { LogoIcon } from './LogoIcon'
import Link from 'next/link'
import styles from './Logo.module.scss';

type PropsType = {}

export const Logo: React.FC<PropsType> = () => {
	return (
		<div className={styles.Logo}>
			<Link href={'/'}>
				<LogoIcon />
			</Link>
		</div>
	)
}
