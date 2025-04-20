"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	amountOptions,
	resolutionOptions,
} from "@/app/dashboard/image/constants";
import { useProModel } from "@/hooks/use-pro-model";
import { toast } from "sonner";

export default function ImageGeneration() {
	const [images, setImages] = useState<string[]>([]);
	const router = useRouter();
	const proModel = useProModel();

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

	const { submitCount, isSubmitting } = form.formState;

	// on prompt submit
	async function onSubmit(values: UserFormData) {
		console.log(values);

		setImages([]);

		try {
			const response = await axios.post("/api/image", values);
			console.log(response.data);

			const urls = response.data.map(
				(image: { url: string }) => image.url
			);

			setImages(urls);

			// reset form state
			form.reset();
		} catch (error: any) {
			if (error.response.status === 403) {
				proModel.onOpen();
			} else {
				toast.error("Something went wrong");
			}
		} finally {
			// refreshes server components and re-fetches data without losing client-side state
			// used for refetching updated usage count data for API Usage Limiter
			router.refresh();
		}
	}

	return (
		<>
			<section className="mx-auto max-w-xl">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex w-full flex-col gap-y-4"
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
						<div className="flex flex-wrap gap-2">
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<Select
											disabled={isSubmitting}
											onValueChange={field.onChange}
											value={field.value}
										>
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
															{amountOption.label}
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
								render={({ field }) => (
									<FormItem>
										<Select
											disabled={isSubmitting}
											onValueChange={field.onChange}
											value={field.value}
										>
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
			<section className="mx-auto max-w-3xl space-y-3">
				{isSubmitting && <Loader />}
				{submitCount === 0 && !isSubmitting && (
					<p className="place-self-center text-sm">
						No image generated.
					</p>
				)}
				<div className="flex flex-wrap items-stretch justify-center gap-6">
					{images.map((src) => (
						<Card
							key={src}
							className="min-w-3xs max-w-md grow pt-0"
						>
							<CardContent className="relative mt-0 aspect-square">
								<Image
									alt="image"
									src={src}
									fill
									className="rounded-xl"
								/>
							</CardContent>
							<CardFooter>
								<Button
									onClick={() => window.open(src)}
									className="w-full cursor-pointer"
									variant={"outline"}
								>
									<Download />
									Download
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</section>
		</>
	);
}
