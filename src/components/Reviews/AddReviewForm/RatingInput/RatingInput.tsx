import React, { useState } from 'react'
import { StarButton, StatusType } from './StarButton/StarButton'
import styles from './RatingInput.module.scss';

type PropsType = {
	setValue: (value: number) => void,
}

export const RatingInput: React.FC<PropsType> = ({setValue}) => {
	//5 statuses for 5 stars
	const [statuses, setStatuses] = useState<StatusType[]>(
		['empty', 'empty', 'empty', 'empty', 'empty']
	);

	const changeStatus = (newStatus: StatusType, id: number) => {
		const copy = [...statuses];

		//every star before is full if we hover on the middle star
		for(let i = 0; i < id-1; i++) {
			copy[i] = 'full';
		}

		copy[id-1] = newStatus;

		setStatuses([...copy])
	}

	//we use this array for correctly working keys
	const starsNumber = [1, 2, 3, 4, 5]

	return (
		<label className={styles.RatingInput}>
			{starsNumber.map(starKey => (
				<StarButton 
					changeStatus={changeStatus}
					id={starKey}
					key={starKey}
					status={statuses[starKey]}
				/>
			))}
		</label>
	)
}
