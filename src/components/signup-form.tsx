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
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const schema = z.object({
	email: z
		.string()
		.email("Seu email deve ser similar a esse exemplo nome@exemplo.extensão"),
	name: z.string().optional(),
	lastName: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function SignUpForm() {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchIsSignedIn = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				setIsSignedIn(false);
				setLoading(false);
				return;
			}
			const { error } = await eden.api.validateCookie({ token: token }).get();
			setIsSignedIn(error === null);
			setLoading(false);
		};
		fetchIsSignedIn();
	}, []);
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
		console.log({ response });
		if (response.error !== null) {
			toast({
				title: "Erro ao cadastrar",
				description: "Por favor, tente novamente mais tarde.",
				variant: "destructive",
			});
			return;
		}
		console.log(response.data);
		localStorage.setItem("token", response.data as string);
		toast({
			title: "Cadastro realizado com sucesso",
			description:
				"Você será redirecionado para a página de visualização do PDF",
		});
		router.push("/visualizar-pdf");
	};

	if (loading) {
		return (
			<div className="w-full flex items-center justify-center">
				<Loader className="w-10 h-10 animate-spin" />
			</div>
		);
	}
	return (
		<Card className="max-w-sm">
			<CardHeader>
				<CardTitle className="text-xl">
					{isSignedIn ? "Visualize o PDF" : "Cadastre-se"}
				</CardTitle>
				<CardDescription>
					{isSignedIn
						? "Clique no botão abaixo"
						: "Insira suas informações para se cadastrar"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isSignedIn ? (
					<div className="w-full flex items-center justify-center">
						<Link href={"/visualizar-pdf"}>
							<Button>CLIQUE PARA VISUALIZAR PDF</Button>
						</Link>
					</div>
				) : (
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
							<Label htmlFor="email">Seu melhor Email*</Label>
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
						<Button
							type="submit"
							className="w-full bg-green-500 hover:bg-green-400"
						>
							CADASTRE-SE
						</Button>
					</form>
				)}
				<div className="mt-4 text-gray-700 text-center text-xs">
					De acordo com a lei 12.965/2014 e 13.709/2018, autorizo Luísa a enviar comunicações por e-mail ou qualquer outro meio e concordo com sua política de privacidade.
					<span className="text-primary text-green-500">{"<3"}</span>
				</div>
			</CardContent>
		</Card>
	);
}
