"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		remember: false,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Login attempt:", formData);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		setFormData({
			...formData,
			[e.target.name]: value,
		});
	};

	return (
		<div className="bg-accent/30 border border-accent/50 rounded-xl p-8 shadow-xl">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiMail className="h-5 w-5 text-muted-foreground" />
						</div>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="your.email@company.com"
							className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
							required
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-foreground mb-2">Password</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<FiLock className="h-5 w-5 text-muted-foreground" />
						</div>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Enter your password"
							className="w-full pl-10 pr-12 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 pr-3 flex items-center"
						>
							{showPassword ? (
								<FiEyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
							) : (
								<FiEye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
							)}
						</button>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<label className="flex items-center">
						<input
							type="checkbox"
							name="remember"
							checked={formData.remember}
							onChange={handleChange}
							className="w-4 h-4 text-blue-600 border-accent/50 rounded focus:ring-2 focus:ring-blue-500/20"
						/>
						<span className="ml-2 text-sm text-muted-foreground">Remember me</span>
					</label>
					<Link
						href="/forgot-password"
						className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
					>
						Forgot password?
					</Link>
				</div>

				<button
					type="submit"
					className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
				>
					Sign In
				</button>
			</form>

			<div className="mt-6 text-center">
				<p className="text-sm text-muted-foreground">
					Don't have an account?{" "}
					<Link
						href="/signup"
						className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
					>
						Contact your administrator
					</Link>
				</p>
			</div>
		</div>
	);
}
