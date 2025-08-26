const testimonials = [
	{
		name: "Antonio",
		avatar: "A",
		title: "Software Engineer",
		description: "This is a great product! It has changed the way I work.",
	},
];

export default function LandingContent() {
	return (
		<section className="px-10 pb-20">
			<h2 className="mb-10 text-center text-4xl font-extrabold text-white">
				Testimonials
			</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{/* {testimonials.map((testimonial) => (
					
				))} */}
			</div>
		</section>
	);
}
