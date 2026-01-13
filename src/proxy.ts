// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export default withAuth(
export async function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	// Manage route protection
	// const isAuth = await getToken({ req })
	const isAuth = true;

	const isLoginPage = pathname.startsWith("/login");
	const sensitiveRoutes = ["/internal/"];
	const isAccessingSensitiveRoute = sensitiveRoutes.some((route) => pathname.startsWith(route));

	if (isLoginPage) {
		if (isAuth) {
			return NextResponse.redirect(new URL("/internal/dashboard", req.url));
		}

		return NextResponse.next();
	}

	if (!isAuth && isAccessingSensitiveRoute) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (pathname === "/internal/logout") {
		return NextResponse.redirect(new URL("/", req.url));
	}
}
