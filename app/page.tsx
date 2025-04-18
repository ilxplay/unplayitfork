import Image from "next/image";
import { Rubik_Mono_One } from "next/font/google";

const rubikMonoOne = Rubik_Mono_One({
	subsets: ["latin"],
	weight: "400",
});

export default function Home() {
	return (
		<main>
			<nav className="flex bg-black/75 backdrop-blur-lg items-center w-full stiky top-0 right-0 left-0 gap-10">
				<Image
					className="size-20"
					src="/logo.png"
					width={512}
					height={512}
					alt="logo"
				/>
				<h1 className={`text-center text-4xl black ${rubikMonoOne.className}`}>
					unplayit
				</h1>
			</nav>
		</main>
	);
}
