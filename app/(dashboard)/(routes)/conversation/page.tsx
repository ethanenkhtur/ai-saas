"use client";

import { z } from "zod";
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    type UserFormData = z.infer<typeof formSchema>;

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isSubmitting = form.formState.isSubmitted;
    const onSubmit = (values: UserFormData) => console.log(values);

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
                                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </section>
                <section className="mt-4">Messages Content</section>
            </main>
        </>
    );
}
