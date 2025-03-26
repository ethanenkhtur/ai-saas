"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import Heading from "@/components/heading";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";

export default function ConversationPage() {
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

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

    // on prompt submit
    async function onSubmit(values: UserFormData) {
        const submitCount = form.formState.submitCount;

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

        let response = null;
        let aiResponse: ChatCompletionMessageParam;

        // logic to pass in entire conversation state to OpenAI API
        if (submitCount === 0) {
            try {
                // first request for a given conversation
                response = await axios.post("/api/conversation", [userMessage]);

                // records the ai response to later append to allMessages
                aiResponse = {
                    role: "assistant",
                    content: response.data,
                };

                // append aiResponse to allMessages
                allMessages = [...allMessages, aiResponse];
                // update state and state variable messages
                setMessages(allMessages);
            } catch (error) {
                console.error("Error posting to /api/conversation", error);
            }
        } else {
            // since not first request, starts another request with appended ai response to allMessages
            response = await axios.post("/api/conversation", allMessages);

            aiResponse = {
                role: "assistant",
                content: response.data,
            };

            // a cycle to keep adding ai response after user message up top
            allMessages = [...allMessages, aiResponse];
            setMessages(allMessages);
        }

        // reset form state
        form.reset();
    }

    const isSubmitting: boolean = form.formState.isSubmitting;

    return (
        <>
            <Heading
                title="Conversation AI"
                description={"The most inspiring conversation you can think of"}
            />
            <main className="px-4">
                <section className="max-w-3xl mx-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full grid grid-cols-12 gap-y-3 gap-x-4"
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
                <section className="space-y-3 mt-6 mx-auto max-w-3xl">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                                "rounded-md",
                                message.role === "user"
                                    ? "p-4 justify-self-end bg-gray-100"
                                    : "justify-self-start "
                            )}
                        >
                            {typeof message.content === "string"
                                ? message.content
                                : "Content not loaded"}
                        </div>
                    ))}
                    {isSubmitting && <Loader />}
                </section>
            </main>
        </>
    );
}
