import { RequestMoviesDataModel } from "@/models";
import { MoviesDataType, ErrorReturnType } from "@/types";
import { mapMovieData } from "@/utils/server/mapMovieData";
import { NextRequest, NextResponse } from "next/server"

type ReturnType =
	NextResponse<MoviesDataType | ErrorReturnType>
	;

export const GET = async (request: NextRequest) => {
	const page = request.nextUrl.searchParams.get('page');

	const url = `https://api.themoviedb.org/3/movie/now_playing?language=ua-UA&page=${page}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
		}
	};

	const response = await fetch(url, options);
	const data: RequestMoviesDataModel = await response.json();

	const returnJson: MoviesDataType | ErrorReturnType = response.ok
		? {
			results: mapMovieData(data.results.length > 0 ? data.results : []),
			totalCount: data.total_results,
			totalPages: data.total_pages
		}
		: {
			error: true, message: 'Some error occured'
		};

	return NextResponse.json(returnJson, { status: response.status });
}