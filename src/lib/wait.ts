async function delayLoading(ms: number) {
	setTimeout(() => {
		// console.log("Loading...");
	}, 0);
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export { delayLoading };
