import HeroImage from "@/components/HeroImage";
import LogoLuisa from "@/components/LogoLuisa";
import { SignUpForm } from "@/components/signup-form";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { eden } from "@/lib/eden";
import { redirect } from "next/navigation";

export default function Home() {
	const isAuthenticated = async () => {
		await eden.api.validateCookie.get().then((res) => {
			console.log(res.status);
			console.log(res.status !== 200);
			res.status !== 200 ? redirect("/visualizar-pdf") : null;
		});
	};
	isAuthenticated();
	return (
		<main className="flex min-h-screen gap-7 flex-col items-center justify-center py-12  min-w-full max-w-screen-xl md:gap-16">
			<div className="w-[70px] ">
				<LogoLuisa />
			</div>
			<section className="w-full flex flex-col justify-between px-5 md:flex-row md:items-center lg:grid lg:grid-cols-5 lg:px-16">
				<div className="flex-1 flex flex-col items-center gap-7 md:w-3/4 md:items-start lg:col-span-2 lg:w-full">
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-semibold md:text-4xl">
							Receba agora mesmo 30 ideias de conteúdo gratuitamente, para que
							você nunca fique sem ideias do que postar
						</h1>
						<p className="text-2xl">
							cadastre-se e tenha acesso imediato ao conteúdo
						</p>
						<p className="text-xs">@luisaoliveirx</p>
					</div>
					<SignUpForm />
				</div>
				<div className="flex-1 flex flex-col mb-2 items-center justify-center lg:col-span-3">
					<HeroImage />
					<p className="text-xs">@luisaoliveirx</p>
				</div>
			</section>
			<section className="px-5 py-8 w-full bg-secondary flex justify-center md:py-16">
				<div className="flex flex-col gap-5 items-center w-full md:w-1/2">
					<p className="font-medium text-lg w-full text-start md:text-2xl md:text-center">
						Existe um padrão por atrás do{" "}
						<span className="text-primary font-semibold">
							conteúdo perfeito
						</span>
					</p>
					<p className="text-end md:text-center">
						Depois de analisar muitos conteúdos e criadoras de conteúdo eu
						recolhi 30 ideias que farão você se destacar.
					</p>
				</div>
			</section>
			<section className="mt-10 px-5 w-full flex flex-col items-center gap-5">
				<SignUpForm />
				<p className="text-xs">@luisaoliveirx</p>
			</section>
		</main>
	);
}
