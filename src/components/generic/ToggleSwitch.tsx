"use client";

interface ToggleSwitchProps {
	label: string;
	description: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export function ToggleSwitch({ label, description, checked, onChange }: ToggleSwitchProps) {
	return (
		<div className="flex items-center justify-between pb-4 border-b border-accent/50">
			<div>
				<h3 className="font-medium text-foreground">{label}</h3>
				<p className="text-sm text-muted-foreground mt-1">{description}</p>
			</div>
			<button
				type="button"
				onClick={() => onChange(!checked)}
				className={`relative w-14 h-7 rounded-full transition-colors ${
					checked ? "bg-blue-600" : "bg-accent"
				}`}
			>
				<div
					className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
						checked ? "translate-x-7" : ""
					}`}
				/>
			</button>
		</div>
	);
}
