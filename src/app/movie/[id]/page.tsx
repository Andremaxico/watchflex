import { MovieInfo } from "@/components/MovieInfo";
import styles from './page.module.scss';
import { MoviePoster } from "@/components/MoviePoster";
import { axiosInstance } from "@/lib/axios";
import { ImagesDataType, MovieDataType, MovieDetailsType } from "@/types";
import { Reviews } from "@/components/Reviews";
import { ScrollDownArrow } from "@/components/ScrollDownArrow";

const getMovieImages = async (id: string) => {
	const res = await axiosInstance.get(`/api/movie/${id}/images`);

	return res.data;
}

const getDetails = async (id: string) => {
	const response = await axiosInstance.get(`/api/movie/${id}/details`);

	const data = response.data;

	return data;
}

export default async function Page({ params }: { params: {id: string} }) {
	const id = params.id;

	const data = await getMovieImages(id) as unknown as ImagesDataType;

	const bestBackdrop = data.backdrops.sort((a, b) => a.vote_average > b.vote_average ? 1 : -1)[0];



	const details = await getDetails(id) as MovieDetailsType;

	return (
		<main
			style={{
				minHeight: '100vh',
				backgroundImage: bestBackdrop ? `url('http://image.tmdb.org/t/p/original/${bestBackdrop.file_path}')` : '',
				backgroundAttachment: 'fixed',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
			className={styles.main}
		>	
			<div className={styles._backTint}></div>
			<ScrollDownArrow />
			<MovieInfo 
				details={details}
			/>
			<Reviews id={id} />            
		</main>
	)
}