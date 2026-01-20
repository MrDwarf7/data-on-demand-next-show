"use client"; // Mark as use client here as the server doesn't have a 'window.*' so it must be used only on client side

import { create } from "zustand";

// TODO: Create section in store or config for all processes that will be available
// to both frontend for staff and backend for admin

//  Will need to build a component for the Drop down that is
// importable for both external and internal side of the site

// Initialize from URL on client-side creation
const getInitialProcess = (): string | null => {
	if (typeof window === "undefined") return null;
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("process");
};

interface UploadState {
	selectedProcess: string | null;
	setSelectedProcess: (process: string | null) => void;
}

export const useUploadStore = create<UploadState>((set, _get) => ({
	selectedProcess: getInitialProcess(),
	setSelectedProcess: (process) => {
		set({ selectedProcess: process });
		// Sync with URL if in browser
		if (typeof window !== "undefined") {
			const url = new URL(window.location.href);
			if (process) {
				url.searchParams.set("process", process);
			} else {
				url.searchParams.delete("process");
			}
			window.history.replaceState({}, "", url.toString());
		}
	},
}));
