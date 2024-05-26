import HeroImage from "@/components/HeroImage";
import LogoLuisa from "@/components/LogoLuisa";
import InstagtramLink from "@/components/instagtramLink";
import { SignUpForm } from "@/components/signup-form";
import { eden } from "@/lib/eden";

export default async function Home() {
	return (
		<main className="flex min-h-screen gap-7 flex-col items-center justify-center py-12  min-w-full max-w-screen-xl md:gap-16">
			<div className="w-[70px] lg:w-[40px]">
				<LogoLuisa />
			</div>
			<section className="w-full flex flex-col justify-between px-5 md:flex-row md:items-center lg:px-16">
				<div className="flex-1 flex flex-col items-center gap-7 md:w-3/4 md:items-start lg:w-full">
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-semibold md:text-4xl">
							Receba agora mesmo 30 ideias de conteúdo gratuitamente, para que
							você nunca fique sem ideias do que postar
						</h1>
						<p className="text-2xl">
							Cadastre-se e tenha acesso imediato ao conteúdo!
						</p>
						<InstagtramLink />
					</div>
					<SignUpForm />
				</div>
				<div className="flex-1 flex flex-col mb-2 items-center justify-center ">
					<HeroImage />
					<InstagtramLink />
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
				<InstagtramLink />
			</section>
		</main>
	);
}
