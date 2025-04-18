import { Rubik_Mono_One } from "next/font/google";
import SignIn from "./sign-in";
import Image from "next/image";
import Link from "next/link";

const rubikMonoOne = Rubik_Mono_One({
	subsets: ["latin"],
	weight: "400",
});

export default function Nav() {
	return (
		<nav className="flex flex-col p-3 md:p-0 md:flex-row bg-black/75 backdrop-blur-lg items-center w-full sticky top-0 right-0 left-0">
			<Link href="/">
				<Image
					className="hidden md:block md:size-20"
					src="/logo.png"
					width={512}
					height={512}
					alt="logo"
				/>
			</Link>
			<h1
				className={`text-center md:text-6xl text-xl black ${rubikMonoOne.className} mx-auto`}
			>
				unplayit
			</h1>
			<SignIn />
		</nav>
	);
}
