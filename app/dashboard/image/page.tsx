import Heading from "@/components/heading";
import ImageGeneration from "@/components/image-page";

export default function ImagePage() {
	return (
		<>
			<Heading
				title="Image Generation"
				description="Only your imagination is the limit."
			/>
			<main className="space-y-10 px-4">
				<ImageGeneration />
			</main>
		</>
	);
}
