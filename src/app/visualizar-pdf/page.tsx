"use client";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import MyDocument from "@/components/pdf-document";
import { eden } from "@/lib/eden";
import { useRouter } from "next/navigation";
import PdfFullscreen from "@/components/pdf-fullscreen";

const App = () => {
	const { back } = useRouter();
	useEffect(() => {
		const fetchIsSignedIn = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				back();
				return;
			}
			const { error } = await eden.api.validateCookie({ token: token }).get();

			if (error) {
				back();
			}
		};
		fetchIsSignedIn();
	}, [back]);
	return (
		<main className="flex min-h-screen items-center justify-center min-w-full px-24 max-w-screen-xl">
			<MyDocument url="/30-Dias-de-Conteuudo-por-Luisa-Oliveira.pdf" />
			{/* <PdfFullscreen fileUrl="/30-Dias-de-Conteuudo-por-Luisa-Oliveira.pdf" /> */}
		</main>
	);
};

export default App;
