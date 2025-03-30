import { RequestTokenResponseDataModel, SessionDataViewModel, SessionResponseDataModel } from "@/models";
import { NextRequest, NextResponse } from "next/server"


//The movie db

//Create Request Token
export const GET = async () => {
	const url = 'https://api.themoviedb.org/3/authentication/token/new';
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
		}
	};

	const res = await fetch(url, options);
	
	const data: RequestTokenResponseDataModel = await res.json();

	if(data.success) {
		return NextResponse.json({
			requestToken: data.request_token,
			expiresAt: data.expires_at,
			error: false,
			approved: false
		}, {status: 200});
	} else {
		return NextResponse.json({
			error: true,
		}, {status: res.status})
	}
}

//Create session id(password)
export const POST = async (req: NextRequest) => {
	// const reqUrl = new URL(req.url);
	// const searchParams = new URLSearchParams(reqUrl.searchParams)
	// const requestToken = searchParams.get('request_token');

	const reader = req.body?.getReader();
	const result = await reader?.read();

	console.log('reqyest body', result);

	const url = `https://api.themoviedb.org/3/authentication/session/new`;
	const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
		},
		// body: JSON.stringify(requestBody)
	};

	const response = await fetch(url, options);
	const data: SessionResponseDataModel = await response.json();

	console.log('auth data', data);

	if(data.success) {
		return NextResponse.json({
			success: data.success,
			id: data.session_id,
		})
	} else {
		return NextResponse.json({
			success: false,
		}, {status: response.status})
	}
}