"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { amountOptions, resolutionOptions } from "./constants";

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
import Loader from "@/components/loader";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ImagePage() {
    // creating zod form schema to validate input
    const formSchema = z.object({
        prompt: z.string().min(1, {
            message: "Image Prompt is required",
        }),
        amount: z.string().min(1),
        resolution: z.string().min(1),
    });

    // react hook form to manage form
    type UserFormData = z.infer<typeof formSchema>;
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
        },
    });

    // on prompt submit
    async function onSubmit(values: UserFormData) {
        console.log(values);
        // reset form state
        form.reset();
    }

    const isSubmitting: boolean = form.formState.isSubmitting;
    const submitCount: number = form.formState.submitCount;

    return (
        <>
            <Heading
                title="Image Generation"
                description={"The most inspiring conversation you can think of"}
            />
            <main className="px-4 space-y-10">
                <section className="max-w-xl mx-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="flex-2">
                                        <FormLabel className="relative left-1 text-base">
                                            Generate Images
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="A horse in the Alps"
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2 flex-wrap">
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={() => (
                                        <FormItem>
                                            <Select>
                                                <FormControl>
                                                    <SelectTrigger className="cursor-pointer">
                                                        <SelectValue placeholder="Number of images" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {amountOptions.map(
                                                        (amountOption) => (
                                                            <SelectItem
                                                                key={
                                                                    amountOption.value
                                                                }
                                                                value={
                                                                    amountOption.value
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                {
                                                                    amountOption.label
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="resolution"
                                    render={() => (
                                        <FormItem>
                                            <Select>
                                                <FormControl>
                                                    <SelectTrigger className="cursor-pointer">
                                                        <SelectValue placeholder="Pick a resolution" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {resolutionOptions.map(
                                                        (resolutionOption) => (
                                                            <SelectItem
                                                                key={
                                                                    resolutionOption.value
                                                                }
                                                                value={
                                                                    resolutionOption.value
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                {
                                                                    resolutionOption.label
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="cursor-pointer"
                                disabled={isSubmitting}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </section>
                <section className="space-y-3 mx-auto max-w-3xl">
                    {isSubmitting && <Loader />}
                </section>
                {submitCount === 0 && !isSubmitting && (
                    <p className="flex flex-col h-full items-center justify-center text-sm">
                        No image generated.
                    </p>
                )}
            </main>
        </>
    );
}
