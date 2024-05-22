import { SignUpForm } from "@/components/signup-form";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen  items-center justify-center min-w-full p-24 max-w-screen-xl">
			<SignUpForm />
		</main>
	);
}
