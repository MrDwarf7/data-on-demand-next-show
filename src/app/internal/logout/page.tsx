import Link from "next/link";
// import { useEffect } from "react";
import { FiCheckCircle, FiLogIn } from "react-icons/fi";

export default function LogoutPage() {
	// useEffect(() => {
	// 	// Here you would typically clear authentication tokens, cookies, etc.
	// 	// For example: localStorage.removeItem('authToken');
	// 	// Or call your logout API endpoint
	// 	console.log("User logged out");
	// }, []);

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-10 border-2 border-success-30 mb-6">
						<FiCheckCircle className="w-10 h-10 text-success-foreground" />
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
						Logged Out Successfully
					</h1>
					<p className="text-muted-foreground">You have been safely logged out of your account</p>
				</div>

				<div className="bg-accent/30 border border-accent/50 rounded-xl p-6 sm:p-8 space-y-4">
					<div className="text-center space-y-3">
						<p className="text-sm text-muted-foreground">
							Thank you for using Data on Demand. Your session has been terminated and all local
							data has been cleared.
						</p>
					</div>

					<div className="pt-4 space-y-3">
						<Link
							href="/login"
							className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
						>
							<FiLogIn className="w-4 h-4" />
							Sign In Again
						</Link>

						<Link
							href="/"
							className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent/50 hover:bg-accent text-foreground rounded-lg font-medium transition-all"
						>
							Return to Homepage
						</Link>
					</div>
				</div>

				<div className="mt-8 text-center">
					<p className="text-xs text-muted-foreground">
						Need help?{" "}
						<Link href="/contact" className="text-blue-600 hover:text-blue-500 underline">
							Contact Support
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
