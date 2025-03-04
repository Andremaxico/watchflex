import React, { useEffect, useState } from 'react'
import { StarButton, StatusType } from './StarButton/StarButton'
import styles from './RatingInput.module.scss';

type PropsType = {
	setValue: (value: number) => void,
	getValue: () => number,
}

export const RatingInput: React.FC<PropsType> = ({setValue, getValue}) => {
	// just to show 5 stars
	const statusesBase: StatusType[] = ['empty', 'empty', 'empty', 'empty', 'empty']

	const [rating, setRating] = useState<number>(0);

	const hanldeMouseLeave = () => {
		setRating(getValue());
	}

	// const handleMouseEnter = () => {
	// 	setRating(0)
	// }

	const saveRating = () => {
		setValue(rating);
	}

	return (
		<label 
			className={styles.RatingInput}
			onMouseLeave={hanldeMouseLeave}
			// onMouseEnter={handleMouseEnter}
		>
			{statusesBase.map((status, idx) => (
				<StarButton
					id={idx}
					key={idx}
					rating={rating}
					setRating={setRating}
					saveRating={saveRating}
				/>
			))}
			<span className={styles.ratingNumber}>{rating > 0 ? rating : ''}</span>
		</label>
	)
}
