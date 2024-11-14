import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: {params: {movieId: string}}) => {
	const { movieId } = params;

	const url = 'https://api.themoviedb.org/3/movie/movie_id/alternative_titles';
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzQ2NjRmMjU3ZDQzNzE2NDdiNTBjMWM5Y2FiNjI0MiIsIm5iZiI6MTcyNzgwNzY1My41ODA5NTcsInN1YiI6IjY2ZmMyMzFmNDk1NWI0YTIwNmYxOTE2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1FC0r8I5Ktn58OrDlI-vAGHH9d0ysGlE-QIg1jkiRzw'
		}
	};

	const response = await fetch(url, options);
	const data = response.json();

	if(response.ok) {
		return NextResponse.json({data}, {status: response.status});
	} else {
		return NextResponse.json({message: 'Some error occured'}, {status: response.status});
	}
}