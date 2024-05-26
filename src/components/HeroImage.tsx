"use client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import type { FC } from "react";
import Image from "next/image";
import heroImage from "../../public/heroImage.svg";

const HeroImage: FC = () => {
	return (
		<AspectRatio ratio={20 / 20}>
			<Image
				src={heroImage}
				alt="hero-image"
				fill
				priority
				loading="eager"
				className="rounded-md object-cover drop-shadow-2xl"
			/>
		</AspectRatio>
	);
};

export default HeroImage;
