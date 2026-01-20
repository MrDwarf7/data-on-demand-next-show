import { Snippet } from "@heroui/snippet";
import { TabsContent } from "@/components/ui/tabs";

const TabsContentAutomation = () => {
	console.log("Rendering TabsContentAutomation");
	return (
		<TabsContent value="automation" className="mt-6">
			<div className="text-center p-8 border border-accent rounded-xl bg-accent/10">
				<h3 className="text-lg font-semibold text-foreground mb-4">Automation Integration</h3>
				<p className="text-muted-foreground mb-6">
					Use the snippet below to integrate with automated systems
				</p>
				<div className="flex justify-center">
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
						}}
					>
						Click to copy me! WOW
					</Snippet>
				</div>
			</div>
		</TabsContent>
	);
};

export { TabsContentAutomation };
