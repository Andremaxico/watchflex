'use client'

import { CiStar } from "react-icons/ci";
import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { MdStarHalf } from "react-icons/md";
import styles from './StarButton.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames'

export type StatusType = 'half' | 'empty' | 'full'

type PropsType = {
	id: number,
	rating: number,
	setRating: (rating: number) => void,
	saveRating: () => void,
}

export const StarButton: React.FC<PropsType> = ({id, setRating, rating, saveRating}) => {
	const [currStatus, setCurrStatus] = useState<StatusType>('empty');
	const buttonRef = useRef<HTMLButtonElement>(null);

	const currId = id + 1;

	useEffect(() => {
		console.log('rating', rating, 'id', currId, rating / 2, currId - 1)
		if(rating / 2 >= currId) {
			setCurrStatus('full');
		} else if (
			rating / 2 > currId - 1 && 
			Math.floor(rating / 2) == currId - 1 && currId-1 > 0
		) {
			setCurrStatus('half');
		} else {
			setCurrStatus('empty')
		}
	}, [rating])

	console.log('currId', currId, 'rating', rating)

	const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log('handle hover');
		const pointerX = e.clientX;
		if(!!buttonRef.current) {
			const btnLeft = buttonRef.current.offsetLeft;
			const btnWidth = buttonRef.current.offsetWidth;
			const btnRight = btnLeft + btnWidth;
			console.log(btnLeft, btnWidth, btnRight, pointerX)
			if(pointerX - btnLeft > btnWidth / 2 && btnRight - pointerX - btnLeft <= 1) {
				setRating(currId*2)
			} else if (pointerX > btnLeft + 3 && pointerX <= btnRight - (btnWidth / 2)) {
				setRating(currId*2-1)
			} else {
				setRating((currId-1)*2)
			}
		}
	}

	const handleClick = (e: React.MouseEvent) => {
		saveRating();
		e.preventDefault();
	}

	return (
		<button 
			className={cn(
				styles.StarButton, 
				currStatus == 'full' ? 
					styles._full : 
					currStatus == 'half' ? 
					styles._half : 
					'' 
				)
			}
			onClick={handleClick}
			onMouseOver={handleHover}
			ref={buttonRef}
		>
			<MdStar className={styles.filled} />
			<MdStarBorder className={styles.border} />
			<MdStarHalf className={styles.half} />
		</button>
	)
}
