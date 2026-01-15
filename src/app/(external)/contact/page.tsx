import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CONTACT_INFO } from "@/config/external/contact-config";
import { ContactForm } from "./_components/ContactForm";

export default function ContactPage() {
	const conInfoLen = (div: number | null): number => {
		if (div == null || div <= 0) {
			return CONTACT_INFO.length;
		}
		if (div > 0) {
			if (Math.ceil(CONTACT_INFO.length % div) === 0) {
				return CONTACT_INFO.length / div;
			}
			return Math.ceil(CONTACT_INFO.length / div);
		} else {
			return CONTACT_INFO.length;
		}
	};

	return (
		<MaxWidthWrapper className="py-8 sm:py-12">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-10 sm:mb-16">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
						Get in Touch
					</h1>
					<p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
						Have questions or need assistance? We&apos;re here to help. Reach out to our team and
						we&apos;ll get back to you as soon as possible.
					</p>
				</div>

				<div
					className={`grid grid-cols-${conInfoLen(4)} md:grid-cols-${conInfoLen(2)} lg:grid-cols-${conInfoLen(1)} gap-4 sm:gap-6 mb-12`}
				>
					{CONTACT_INFO.map((info) => (
						<div
							key={info.title}
							className={`${info.classNameBg} border border-accent/50 rounded-xl p-6 text-center hover:scale-105 transition-transform`}
						>
							<div className={`${info.classNameColor} flex justify-center mb-4`}>
								{<info.icon className="w-8 h-8" />}
							</div>
							<h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
							{info.link ? (
								<a
									href={info.link}
									className={`text-sm ${info.classNameColor} hover:underline mb-1 justify-center flex`}
								>
									{info.content}
								</a>
							) : (
								<p className="text-sm text-muted-foreground">{info.content}</p>
							)}
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<ContactForm />
					</div>

					<div className="lg:col-span-1">
						<div className="bg-accent/30 border border-accent/50 rounded-xl p-6 sm:p-8 h-full">
							<h3 className="text-xl font-bold text-foreground mb-4">Quick Information</h3>
							<div className="space-y-4 text-sm text-muted-foreground">
								<p>Our support team typically responds within 24 hours during business days.</p>
								<p>For urgent technical issues, please contact our support line directly.</p>
								<p>You can also find helpful resources and documentation in our knowledge base.</p>
							</div>

							<div className="mt-8 pt-8 border-t border-accent/50">
								<h4 className="font-semibold text-foreground mb-3">Frequently Asked Questions</h4>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>• How do I upload documents?</li>
									<li>• What file formats are supported?</li>
									<li>• How long does processing take?</li>
									<li>• Can I track my submissions?</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	);
}
