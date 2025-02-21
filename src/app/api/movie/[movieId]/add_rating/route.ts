import { NextRequest } from "next/server";


export const POST = async (requestData: NextRequest, context: any) => {
	const { movieId } = context.params;

	const body = requestData.body;

	const options = {
		method: 'POST',
		headers: {
		  accept: 'application/json',
		  'Content-Type': 'application/json;charset=utf-8',
		  Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
		}
	  };
	  
	const response = await fetch('https://api.themoviedb.org/3/movie/movie_id/rating', options)

	

	console.log('Post body', body)
} 