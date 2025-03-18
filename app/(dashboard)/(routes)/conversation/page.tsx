import Heading from "@/components/heading";
import { MessagesSquare } from "lucide-react";

export default function ConversationPage() {
    return (
        <>
            <Heading
                title="Conversation"
                description="Our most advanced conversation model."
                icon={MessagesSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
        </>
    );
}
