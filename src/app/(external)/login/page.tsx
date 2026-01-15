import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-12">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<div className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6">
						<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
							<span className="text-2xl font-bold text-blue-600">SA</span>
						</div>
					</div>
					<h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
					<p className="text-muted-foreground">Sign in to access your automation dashboard</p>
				</div>

				<LoginForm />

				<div className="mt-8 text-center text-xs text-muted-foreground">
					<p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
				</div>
			</div>
		</div>
	);
}
