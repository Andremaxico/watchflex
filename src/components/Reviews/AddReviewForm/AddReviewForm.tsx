import React from 'react'
import styles from './AddReviewForm.module.scss'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '@/lib/axios'
import { RatingInput } from './RatingInput/RatingInput'

type PropsType = {
	movieId: string,
}

type FormDataType = {
	comment: string,
	rating: number,
}


//In fact, we can only send rating

const addRating = async (value: number, movieId: string) => {
	const response = await axiosInstance.post(`/api/movie/${movieId}/add_rating`, value);

	return response.status;
}

export const AddReviewForm: React.FC<PropsType> = ({movieId}) => {
	const { handleSubmit, formState: { errors }, setValue, register, getValues} = useForm<FormDataType>();

	const onSubmit = async (data: FormDataType) => {
		const response = await addRating(data.rating, movieId);

		console.log('reponse status', response);
	}

	const setRatingValue = (value: number) => {
		setValue('rating', value)
	}
	const getRatingValue = (): number => {
		return getValues('rating')
	}

	return (
		<form 
			className={styles.AddReviewForm}
			onSubmit={handleSubmit(onSubmit)}
		>
			<RatingInput 
				setValue={setRatingValue} 
				getValue={getRatingValue}
			/>
			<label className={styles.commentLabel}>
				Ваш відгук
				<textarea 	
					className={styles.commentTextarea}
					rows={4}
					cols={10}
					{...register('comment', {
						required: false,
						maxLength: 300,
						minLength: 2,
					})}
					placeholder='Напишіть щось...'
				/>
			</label>

			<button className={styles.sendBtn}>Надіслати</button>
		</form>
	)
}
