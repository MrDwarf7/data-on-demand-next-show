import { PiEye, PiListMagnifyingGlass, PiTarget } from "react-icons/pi";

export const EXTERNAL_CORE_VALUES = [
	{
		id: 1,
		name: "Consistency",
		icon: <PiTarget />,
		summary:
			"Standardized document intake with automated validation for reliable, consistent results.",
		details: {
			id: 1,
			lines: [
				"Consistency and reliability are important to everyone and they tend to go hand in hand.",
				"In order to achieve the level of consistency that's required within the automation space, we've chosen to implement receiving files through our new Upload Portal.",
				"This allows us to standardize the intake of documents enabling validation of them against pre-defined requirements or rules that have been set out by the relevant Business Contacts responsible for the process.",
				"How does this change yield consistency? It provides a consistent experience for our users, whether that's being made aware a submitted document doesn't match the pre-defined required structure or being informed that the document successfully uploaded and is now being processed.",
				"You could send us your excel/csv copy of your shopping list instead of the business document, but now we won't attempt to process it!",
			],
		},
	},

	{
		id: 2,
		name: "Visibility",
		icon: <PiListMagnifyingGlass />,
		summary: "Real-time insights into queue status, workloads, and resource availability.",
		details: {
			id: 2,
			lines: [
				"Visibility is important to us. Visibility allows for that invaluable line of communication between ourselves and our Operational Teams that makes day to day activities easier than they might be without it.",
				"All without the need for redundant and often time-consuming emails (not to mention waiting for the reply too!).",
				"So to bring visibility for our processes out of the stone age and into the modern - we've created a Statistics page that will allow for our Operation Teams to quickly glean information on the current state of various processes.",
				"Allowing for the ability to monitor the current state of queues, workloads, and general resource availability.",
			],
		},
	},

	{
		id: 3,
		name: "Transparency",
		icon: <PiEye />,
		summary: "Clear insights into what's happening, when, and why decisions are made.",
		details: {
			id: 3,
			lines: [
				"Transparency should be a core value of a department that is dedicated to automating repetitious tasks.",
				"Transparency allows users of the service to see what is happening, when it is happening, and understand why certain choices are made.",
				"While also giving potential insight into what might be happening behind the scenes.",
			],
		},
	},
];
