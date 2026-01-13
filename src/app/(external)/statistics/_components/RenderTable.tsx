"use client";

const RenderTable = () => {
	return (
		// s
		<div>The Table Component would be here</div>
	);
};

// 	const { columns, rows, fetchData }: TableDataState = useTableDataStore();

// 	useEffect(() => {
// 		fetchData();
// 	}, [fetchData]);

// 	return (
// 		<div className="pt-5">
// 			<Table aria-label="Table Data" color={selectedColor}>
// 				<TableHeader columns={columns}>
// 					{(column) => (
// 						<TableColumn key={column.key}>{column.label}</TableColumn>
// 					)}
// 				</TableHeader>
// 				<TableBody items={rows} emptyContent="No data found">
// 					{(item) => (
// 						<TableRow key={item.id}>
// 							{/* {" "} */}
// 							{/* Assuming each row has a unique 'id' */}
// 							{columns.map((column) => (
// 								<TableCell key={column.key}>
// 									{/* {isKeyOfReturnedDataItem(column.key, item)
// 											? (item[column.key] as string)
// 											: null} */}
// 									{item[column.key as keyof TableRowData]}
// 								</TableCell>
// 							))}
// 						</TableRow>
// 					)}
// 				</TableBody>
// 			</Table>
// 		</div>
// 	);
// };

export { RenderTable };

// import React, { useEffect, useState } from "react";

// import {
// 	Table,
// 	TableHeader,
// 	TableBody,
// 	TableColumn,
// 	TableRow,
// 	TableCell,
// } from "@nextui-org/react";

// import type { TableDataState, TableRowData } from "@/types/table-data";
// import { useTableDataStore } from "@/store/store";
// { useEffect }

// import {
// 	Table,
// 	TableHeader,
// 	TableBody,
// 	TableColumn,
// 	TableRow,
// 	TableCell,
// } from "@nextui-org/react";

// import type { TableRowData, TableColor } from "@/types/table-data";
// import { useTableDataStore } from "@/components/external/statistics/useTableDataStore";

// 	const [selectedColor, setSelectedColor] = useState<TableColor>("primary");
// 	const { columns, rows, isLoading, fetchTableData } = useTableDataStore();
// 	const [tableData, setTableData] = useState([]);

// 	useEffect(() => {
// 		setTableData([]);
// 		try {
// 			const data = fetchTableData();
// 			console.log(" initial use effect sect data:", data);
// 			if (!data) {
// 				console.error("Error fetching table data");
// 				return void 0;
// 			}
// 		} catch (error) {
// 			console.error("Error in initial use effect:", error);
// 		}
// 		return () => {
// 			// Cleanup
// 			console.log("Cleanup");
// 			setTableData([]);
// 		};
// 	}, [fetchTableData]);

// 	if (isLoading || !fetchTableData) {
// 		return <div>Loading...</div>; // Any loading spinner (Or loading.tsx for NextJS)
// 	}
// 	if (!fetchTableData) {
// 		return <div>Error: Invalid table data</div>;
// 	}

// 	{
// 		return (
// 			<div className="pt-5">
// 				<Table aria-label="Table Data" color={selectedColor}>
// 					<TableHeader columns={columns}>
// 						{(column) => (
// 							<TableColumn key={column.key}>{column.label}</TableColumn>
// 						)}
// 					</TableHeader>
// 					<TableBody items={rows} emptyContent="No data found">
// 						{(item) => (
// 							<TableRow key={item.id}>
// 								{/* {" "} */}
// 								{/* Assuming each row has a unique 'id' */}
// 								{columns.map((column) => (
// 									<TableCell key={column.key}>
// 										{/* {isKeyOfReturnedDataItem(column.key, item)
// 											? (item[column.key] as string)
// 											: null} */}
// 										{item[column.key as keyof TableRowData]}
// 									</TableCell>
// 								))}
// 							</TableRow>
// 						)}
// 					</TableBody>
// 				</Table>
// 			</div>
// 		);
// 	}
// };

// export default RenderTableComponent;
