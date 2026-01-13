// import { create } from "zustand";
// import axios from "axios";
// import { TableData, TableDataState } from "@/types/table-data";

// export const useTableDataStore = create<TableData>((set) => ({
// 	color: "default",
// 	columns: [],
// 	rows: [],
// 	isLoading: false,
// 	error: null,
// 	fetchData: async () => {

// 	},
// }));

// 		set({ isLoading: true });
// 		try {
// 			const res = await axios.get("/api/statistics/");
// 			set({ columns: res.data.columns, rows: res.data.rows, isLoading: false });
// 		} catch (error) {
// 			set({ error, isLoading: false });
// 		}
// 	},

// TODO: Create section in store or config for all processes that will be available
// to both frontend for staff and backend for admin

//  Will need to build a component for the Drop down that is
// importable for both external and internal side of the site

// Example store

// interface State {
// 	count: number;
// 	increment: () => void;
// 	decrement: () => void;
// 	clear: () => void;
// }

// export const useStore = create<State>((set) => ({
// 	count: 0,
// 	increment: () => set((state) => ({ count: state.count + 1 })),
// 	decrement: () => set((state) => ({ count: state.count - 1 })),
// 	clear: () => set({ count: 0 }),
// }));
