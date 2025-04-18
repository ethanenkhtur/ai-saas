import Heading from "@/components/heading";
import ChatPage from "@/components/chat";

export default function ConversationPage() {
	return (
		<>
			<Heading
				title="Conversation AI"
				description={"The most inspiring conversation you can think of"}
			/>
			<main className="space-y-10 px-4">
				<ChatPage />
			</main>
		</>
	);
}
