"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Markdown from "react-markdown";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useProModel } from "@/hooks/use-pro-model";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ChatPage() {
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const proModel = useProModel();
	const router = useRouter();

	// creating zod form schema to validate input
	const formSchema = z.object({
		prompt: z.string().min(1, "Prompt is required"),
	});

	// react hook form to manage form
	type UserFormData = z.infer<typeof formSchema>;
	const form = useForm<UserFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const { submitCount, isSubmitting } = form.formState;

	// on prompt submit
	async function onSubmit(values: UserFormData) {
		try {
			const userMessage: ChatCompletionMessageParam = {
				role: "user",
				content: values.prompt,
			};

			// append user message to allMessages
			let allMessages: ChatCompletionMessageParam[] = [
				...messages,
				userMessage,
			];

			setMessages(allMessages);

			const response = await axios.post("/api/conversation", allMessages);

			const aiResponse: ChatCompletionMessageParam = {
				role: "assistant",
				content: response.data,
			};

			allMessages = [...allMessages, aiResponse];

			setMessages(allMessages);

			// reset form state
			form.reset();
		} catch (error: any) {
			if (error.response.status === 403) {
				proModel.onOpen();
			} else toast.error("Something went wrong");

			form.reset();
			setMessages([]);
		} finally {
			// refreshes server components and re-fetches data without losing client-side state
			// used for refetching updated usage count data for API Usage Limiter
			router.refresh();
		}
	}

	// whenever a new response comes in, it is scrolled into view
	useEffect(
		() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
		[messages]
	);

	return (
		<>
			<section className="mx-auto max-w-3xl">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid w-full grid-cols-12 gap-x-4 gap-y-3"
					>
						<FormField
							control={form.control}
							name="prompt"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-10">
									<FormLabel className="relative left-1 text-base">
										Start Chatting
									</FormLabel>
									<FormControl>
										<Input
											placeholder="How do I get rich?"
											{...field}
										></Input>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="col-span-12 cursor-pointer lg:col-span-2 lg:self-end"
							disabled={isSubmitting}
						>
							Generate
						</Button>
					</form>
				</Form>
			</section>
			<section className="mx-auto max-w-3xl space-y-6">
				{messages.map((message, index) => (
					<div
						key={index}
						className={cn(
							"overflow-auto rounded-md",
							message.role === "user"
								? "justify-self-end bg-gray-100 p-4"
								: "flex gap-x-4 justify-self-start"
						)}
					>
						<div>
							{typeof message.content === "string" ? (
								<Markdown>{message.content}</Markdown>
							) : (
								"Content not loaded"
							)}
						</div>
					</div>
				))}
				{isSubmitting && <Loader />}

				{submitCount === 0 && !isSubmitting && (
					<p className="flex h-full flex-col items-center justify-center text-sm">
						No conversation started.
					</p>
				)}
			</section>
			<div ref={messagesEndRef} />
		</>
	);
}
