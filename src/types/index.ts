export type ActionStatusType = 'loading' | 'error' | 'success';

export type AuthorDetailsType = {
	name: string,
	username: string,
	avatar_path: string,
	rating: string,
}

export type ReviewType = {
	author: string,
	author_details: AuthorDetailsType,
	content: string,
	created_at: string,
	id: string,
	updated_at: string,
	url: string,
}

export type ImageDataType = {
	aspect_ratio: number,
	height: number,
	iso_639_1: string, 
	file_path: string,
	vote_average: number,
	vote_count: number,
	width: number,
}

export type ImagesDataType = {
	backdrops: ImageDataType[],
	id: number,
	logos: ImageDataType[],
	posters: ImageDataType[],
}

export type CollectionType = {
	id: number,
	name: string,
	poster_path: string,
	backdrop_path: string,
}

export type GenreType = {
	id: number,
	name: string,
}

export type CompanyType = {
	id: number,
	logo_path: string,
	name: string,
	origin_country: string
}

export type ProductionCountryType = {
	iso_3166_1: string,
	name: string,
}

export type SpokenLanguageType = {
	english_name: string,
	iso_639_1: string,
	name: string,
}

export type MovieDetailsType = {
	adult: boolean,
	backddrop_path: string,
	belongs_to_colection: CollectionType,
	budget: number,
	genres: GenreType[],
	homepage: string,
	id: number,
	imdb_id: string,
	origin_country: string[],
	original_language: string,
	original_title: string,
	overview: string, 
	popularity: number,
	poster_path: string,
	production_companies: CompanyType[],
	production_countries: ProductionCountryType[],
	release_date: string,
	revenue: number,
	runtime: number,
	spoken_languages: SpokenLanguageType[],
	status: string,
	tagline: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number
}

export type MovieDataType = {
	adult: boolean,
	backdropPath: string,
	genreIds: number[],
	id: number,
	originalLanguage: string,
	originalTitle: string,
	describtion: string,
	popularity: number,
	posterUrl: string,
	releaseDate: string,
	title: string,
	video: boolean,
	rating: number,
	voteCount: number,
}

export type MoviesDataType = {
	results: MovieDataType[],
	totalCount: number,
	totalPages: number
}

export type ErrorReturnType = {
	message: string,
	error: boolean,
}