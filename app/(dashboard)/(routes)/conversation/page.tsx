"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

export default function ConversationPage() {
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
    function onSubmit(values: UserFormData) {
        console.log(values);
    }

    return (
        <>
            <Heading
                title="Conversation AI"
                description={"The most inspiring conversation you can think of"}
            />
            <main className="px-4 items-center">
                <section>
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
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </section>
            </main>
        </>
    );
}
