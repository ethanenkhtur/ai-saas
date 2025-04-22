export default function LandingLayout(props: { children: React.ReactNode }) {
	return (
		<main className="h-full overflow-auto bg-[#111827]">
			<div className="mx-auto h-full w-full max-w-5xl">
				{props.children}
			</div>
		</main>
	);
}
