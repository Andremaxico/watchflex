import React from 'react'
import styles from './AddReviewForm.module.scss'
import { useForm } from 'react-hook-form'

type PropsType = {}

type FormDataType = {
	comment: string,
}

export const AddReviewForm: React.FC<PropsType> = () => {
	const { control, formState: { errors }, setValue, register } = useForm<FormDataType>();

	const handleSubmit = (data: FormDataType) => {

	}

	return (
		<form className={styles.AddReviewForm}>
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
