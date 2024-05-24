"use client";
import React from "react";
import ReactDOM from "react-dom";
import MyDocument from "@/components/pdf-document";

const App = () => {
	return (
		<main className="flex min-h-screen items-center justify-center min-w-full px-24 max-w-screen-xl">
			<MyDocument url="/30-Dias-de-Conteuudo-por-Luisa-Oliveira.pdf" />
		</main>
	);
};

export default App;
