import React from 'react';
import styles from './Footer.module.scss';

type PropsType = {};

export const Footer: React.FC<PropsType> = () => {
	return (
		<footer className={styles.Footer}>
			<div className="container">
				<p className={styles.text}>
					All rights reserved @Andremaxico
				</p>
			</div>
		</footer>
	)
}
