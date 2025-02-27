import { RequestReviewsResponseDataModel } from "@/models";
import { ErrorReturnType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

type ReturnType = NextResponse<ErrorReturnType | RequestReviewsResponseDataModel>;

export const GET = async (req: NextRequest, context: any): Promise<ReturnType> => {
	const { movieId } = context.params;
	const page = req.nextUrl.searchParams.get('page');

	const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US/page=${page || 1}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
		}
	};

	const response = await fetch(url, options);
	const data = await response.json() as RequestReviewsResponseDataModel;

	if(response.ok) {
		return NextResponse.json(data, { status: response.status });
	} else {
		return NextResponse.json({error: true, message: 'Some error occured'}, { status: response.status })
	}
}
