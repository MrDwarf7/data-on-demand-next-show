import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "(.*)",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type, Authorization",
					},
				],
			},
		];
	},
	allowedDevOrigins: [
		"localhost:3000",
		"10.0.0.*",
	]

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
};

export default nextConfig;
