import Image from "next/image";
import { Rubik_Mono_One } from "next/font/google";
import SignIn from "@/components/sign-in";
import { auth } from "@/auth";

const rubikMonoOne = Rubik_Mono_One({
	subsets: ["latin"],
	weight: "400",
});

export default async function Home() {
	const session = await auth();
	return (
		<main>
			<nav className="flex bg-black/75 backdrop-blur-lg items-center w-full sticky top-0 right-0 left-0">
				<Image
					className="size-20"
					src="/logo.png"
					width={512}
					height={512}
					alt="logo"
				/>
				<h1
					className={`text-center text-xl black ${rubikMonoOne.className} mx-auto`}
				>
					unplayit
				</h1>
				<SignIn />
			</nav>
			<p>{JSON.stringify(session)}</p>
		</main>
	);
}
