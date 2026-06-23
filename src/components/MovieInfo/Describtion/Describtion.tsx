import React from 'react'
import styles from './Describtion.module.scss';
import { TiStarFullOutline } from "react-icons/ti";
import Image from 'next/image';

type PropsType = {
    text: string,
    posterUrl: string,
    rating: number,
    genresNames: string[],
    budget: number,
}

export const Describtion: React.FC<PropsType> = ({ text, posterUrl, rating, genresNames, budget }) => {
    console.log(text);

    const shortenText = text.slice(0, 100)

    console.log('text', shortenText);

    return (
        <div className={styles.Describtion}>
            <div className={styles.poster}>
                <Image
                    alt='Movie poster'
                    src={`https://image.tmdb.org/t/p/original/${posterUrl}`}
                    height={350}
                    width={240}
                />
            </div>
            <div className={styles.mainInfo}>
                <p className={styles.text}>{text}</p>
                <ul className={styles.genres}>
                    {genresNames.map(name => (
                        <li className={styles.genre} key={name}>{name}</li>
                    ))}
                </ul>
                <p className={styles.budget}><b>Бюджет:</b> {budget.toLocaleString('en-US')} $</p>
                <div className={styles.rating}>
                    <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
                    <TiStarFullOutline className={styles.starIcon} />
                </div>
            </div>
        </div>
    )
}
