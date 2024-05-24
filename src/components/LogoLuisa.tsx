"use client";
import type { FC } from "react";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

const LogoLuisa: FC = () => {
	return (
		<AspectRatio ratio={9 / 9}>
			<Image
				src={"/L.png"}
				alt="Logo LuisaOliveirx"
				priority
				fill
				fetchPriority="high"
				loading="eager"
				className="rounded-md object-cover"
			/>
		</AspectRatio>
	);
};

export default LogoLuisa;
