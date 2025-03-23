"use client";

import axios from "axios";
import { z } from "zod";
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formSchema } from "./constants";

import Heading from "@/components/heading";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConversationPage() {
    // useRouter from next js to refresh route after onsubmit
    const route = useRouter();

    // state variable messages to add user and api content to the page with useState
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

    type UserFormData = z.infer<typeof formSchema>;
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    // whether a submission is in process; prop of react hook form
    const isLoading = form.formState.isSubmitting;
    console.log("isSubmimtting:", isLoading);

    const onSubmit = async (values: UserFormData) => {
        try {
            // model for the user's prompt to send to api
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            };

            // combine userMessage with overall message state array
            const newMessages = [...messages, userMessage];
            // update state with updated values;
            setMessages(newMessages);

            // request to api
            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            });

            // updates the state after response from api
            setMessages((current) => [...current, response.data]);

            // resets form after successful response to enable another submission; prevents user to make additional submission while one is processing
            form.reset();
        } catch (error: unknown) {
            // TODO: Add Pro Model
            console.error(error);
        } finally {
            route.refresh();
            console.log("route is refreshed");
        }
    };

    return (
        <>
            <Heading
                title="Conversation"
                description="Our most advanced conversation model."
                icon={MessagesSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <main className="px-4 lg:px-8">
                <section>
                    <Form {...form}>
                        <form
                            action=""
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none shadow-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:shadow-none"
                                                disabled={isLoading}
                                                placeholder="How do I calculate the radius of a circle?"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </section>
                <section className="space-y-4 mt-4">
                    <div className="flex flex-col gap-y-4">
                        {messages.map((message, index) => (
                            <div key={index}>
                                {typeof message.content === "string"
                                    ? message.content
                                    : "Content not available"}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
