import { MovieDataModel } from "@/models";
import { ErrorReturnType, MoviesDataType } from "@/types";
import { NextRequest, NextResponse } from "next/server";

type ReturnType = NextResponse<MoviesDataType | ErrorReturnType>

export const GET = async (req: NextRequest, context: any): Promise<ReturnType> => {
	const accountId = context.params.accountId;

	const reqUrl = new URL(req.url);
	const searchParams = new URLSearchParams(reqUrl.searchParams);
	const page = searchParams.get('page');

	const url = `https://api.themoviedb.org/3/account/${accountId}/rated/movies?language=uk-UA&page=${page}&sort_by=created_at.asc`;
	const options = {method: 'GET', headers: {accept: 'application/json'}};

	const res = await fetch(url, options);
	const data = await res.json()

	if(res.ok) {
		return NextResponse.json(data as MoviesDataType)
	} else {
		return NextResponse.json({error: true, message: 'some error occured', status: res.status})
	}
}