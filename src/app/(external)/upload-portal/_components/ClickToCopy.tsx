import { Snippet } from "@heroui/snippet";
import type { ClickToCopySnippetProps } from "@/types/local";

// ...props
// className,
// props,

const ClickToCopySnippet = ({ ...props }: ClickToCopySnippetProps): React.ReactElement => {
	// const { className, text } = props;
	const { className, text } = props;

	return (
		<div>
			<Snippet
				size="md"
				color="primary"
				variant="bordered"
				symbol="#"
				tooltipProps={{
					color: "primary",
					content: "Click for easy copy",
					placement: "right",
					closeDelay: 1000,
					// onPointerEnter: () => open
				}}
				className={className}
			>
				{text}
			</Snippet>
		</div>
	);
};

export default ClickToCopySnippet;
