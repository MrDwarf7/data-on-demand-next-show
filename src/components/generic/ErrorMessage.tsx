"use client";

interface ErrorMessageProps {
	error?: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
	if (!error) return null;
	return <p className="text-xs text-red-600 mt-1">Error: {error}</p>;
}
