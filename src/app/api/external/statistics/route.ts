import { type NextRequest, NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const { url, nextUrl } = request;
	// Do whatever you want
	return NextResponse.json(
		{
			message: "Hello External Statistics page!!!",
			url: url,
			nextUrl: nextUrl,
		},
		{ status: 200 }
	);
}
