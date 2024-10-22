export type SessionResponseDataModel = {
	success: boolean,
	session_id: string,
	expires_at: string
}

export type SessionDataViewModel = {
	success: boolean,
	id: string,
	expiresAt: string
}

export type RequestTokenResponseDataModel = {
	success: boolean,
	expires_at: string,
	request_token: string
}

export type RequestTokenViewModel = {
	requestToken?: string,
	expiresAt?: string,
	error: boolean,
	approved: boolean,
}

export type RequestMovieDataModel = {
	adult: boolean,
	backdrop_path: string,
	genre_ids: number[],
	id: number,
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string,
	release_date: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number,
}