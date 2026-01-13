type TableColor = "default" | "primary" | "success" | "warning" | "secondary" | "danger";

type TableColumnData = {
	[key: string]: string | number;
	label: string | number;
};
type TableRowData = {
	id: string;
	[key: string]: string | number;
};

type TableDataState = {
	columns: TableColumnData[] | unknown;
	rows: TableRowData[] | unknown;
	isLoading: boolean | unknown;
	fetchTableData: () => Promise<void>;
};

interface TableData extends TableDataState {
	color: TableColor;
	columns: TableColumnData | never[];
	rows: TableRowData | never[];
	// tableState?: T;
}

export type { TableColor, TableColumnData, TableRowData, TableDataState, TableData };
