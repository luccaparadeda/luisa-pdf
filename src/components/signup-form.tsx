"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { eden } from "@/lib/eden";

const schema = z.object({
	email: z
		.string()
		.email("Seu email deve ser similar a esse exemplo nome@exemplo.extensão"),
	name: z.string().optional(),
	lastName: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function SignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const { toast } = useToast();

	const router = useRouter();

	const onSubmit = async (data: FormValues) => {
		const response = await eden.api.index.post(data);

		if (response.status !== 200) {
			toast({
				title: "Erro ao cadastrar",
				description: "Por favor, tente novamente mais tarde.",
				variant: "destructive",
			});
			return;
		}

		toast({
			title: "Cadastro realizado com sucesso",
			description:
				"Você será redirecionado para a página de visualização do PDF",
		});
		router.push("/visualizar-pdf");
	};
	return (
		<Card className="max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">Cadastre-se</CardTitle>
				<CardDescription>
					Insira suas informações para se cadastrar
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
					<div className="grid grid-rows-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name">Nome</Label>
							<div className="grid gap-1">
								<Input
									id="first-name"
									placeholder="Pedro"
									{...register("name")}
								/>
								{errors.name?.message && (
									<p className="text-red-500 text-xs min-h-2">
										{errors.name?.message}
									</p>
								)}
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Sobrenome</Label>
							<div className="grid gap-1">
								<Input
									id="last-name"
									placeholder="Oliveira"
									{...register("lastName")}
								/>
								{errors.lastName?.message && (
									<p className="text-red-500 text-xs min-h-2">
										{errors.lastName?.message}
									</p>
								)}
							</div>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email*</Label>
						<div className="grid gap-1">
							<Input
								id="email"
								type="email"
								placeholder="m@exemplo.com"
								{...register("email")}
							/>
							{errors.email?.message && (
								<p className="text-red-500 text-xs min-h-2">
									{errors.email?.message}
								</p>
							)}
						</div>
					</div>
					<Button type="submit" className="w-full">
						CADASTRE-SE
					</Button>
				</form>
				<div className="mt-4 text-center text-xs">
					Não se preocupe, caso você já tenha feito cadastro anteriormente é só
					inserir o seu melhor email novamente{" "}
					<span className="text-primary">{"<3"}</span>
				</div>
			</CardContent>
		</Card>
	);
}