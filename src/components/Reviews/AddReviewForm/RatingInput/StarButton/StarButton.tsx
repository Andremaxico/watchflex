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
	status: StatusType,
	id: number,
	changeStatus: (status: StatusType, id: number) => void
}

export const StarButton: React.FC<PropsType> = ({id, changeStatus, status}) => {
	const [currStatus, setCurrStatus] = useState<StatusType>(status);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		console.log('curr status', currStatus)
		changeStatus(currStatus, id)
	}, [currStatus])

	

	const handleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log('handle hover');
		const pointerX = e.clientX;
		if(!!buttonRef.current) {
			const btnLeft = buttonRef.current.offsetLeft;
			const btnWidth = buttonRef.current.offsetWidth;
			const btnRight = btnLeft + btnWidth;
			console.log(btnLeft, btnWidth, btnRight, pointerX)
			if(pointerX - btnLeft > btnWidth / 2 && btnRight - pointerX - btnLeft <= 1) {
				setCurrStatus('full');
			} else if (pointerX - btnLeft > btnWidth / 2) {
				setCurrStatus('half');
			} else {
				setCurrStatus('empty')
			}
		}
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
			onMouseOver={handleHover}
			ref={buttonRef}
		>
			<MdStar className={styles.filled} />
			<MdStarBorder className={styles.border} />
			<MdStarHalf className={styles.half} />
		</button>
	)
}
