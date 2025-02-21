import { NextRequest, NextResponse } from "next/server";

type ReturnType = {
    success: boolean,
}

export const POST = async (req: NextRequest, context: any): Promise<NextResponse<ReturnType>> => {
    const { movieId } = context.params;
    const value = await req.json();

    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
        },
        body: JSON.stringify({value})
    };

    const response = await fetch(url, options);

    const json = await response.json()

    return NextResponse.json({success: response.ok})
}
