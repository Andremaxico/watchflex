import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const reqUrl = new URL(req.url);
	const searchParams = new URLSearchParams(reqUrl.searchParams);
	const sessionId = searchParams.get('search_id');
	const requestToken = searchParams.get('request_token');

	const url = `https://api.themoviedb.org/3/account?api_key=${requestToken}&session_id=${sessionId}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
		}
	}

	const res = await fetch(url, options)
	const data = await res.json();

	console.log('data', data);
}