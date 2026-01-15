"use client";

interface Option {
	value: string;
	label: string;
}

interface SelectDropdownProps {
	label: string;
	options: Option[];
	value?: string;
	onChange?: (value: string) => void;
	required?: boolean;
}

export function SelectDropdown({ label, options, value, onChange, required }: SelectDropdownProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-foreground mb-2">{label}</label>
			<select
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				required={required}
				className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
