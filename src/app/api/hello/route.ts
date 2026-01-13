import { type NextRequest, NextResponse } from "next/server";

//  GENERIC HELLO WORLD ROUTE

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const { url, nextUrl } = request;
	// Do whatever you want
	const data = { message: "Hello World", url: url, nextUrl: nextUrl };

	return NextResponse.json(data, { status: 200 });
}

// To handle a POST request to /api
// export async function POST(request: NextResponse | Request) {
// 	const { url, body } = request;
// 	// Do whatever you want
// 	// Do whatever you want
// 	const data = { message: "Hello World from a POST req", url: url, body: body };

// 	return NextResponse.json(data, { status: 201 });
// }
