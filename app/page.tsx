import Image from "next/image";
import { Rubik_Mono_One } from "next/font/google";
import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import validateuser from "@/components/isusergoodenough";

const rubikMonoOne = Rubik_Mono_One({
	subsets: ["latin"],
	weight: "400",
});

export default async function Home() {
	const session = await auth();
	const valid = await validateuser();
	return (
		<main>
			<nav className="flex flex-col p-3 md:p-0 md:flex-row bg-black/75 backdrop-blur-lg items-center w-full sticky top-0 right-0 left-0">
				<Image
					className="hidden md:block md:size-20"
					src="/logo.png"
					width={512}
					height={512}
					alt="logo"
				/>
				<h1
					className={`text-center md:text-6xl text-xl black ${rubikMonoOne.className} mx-auto`}
				>
					unplayit
				</h1>
				<SignIn />
			</nav>
			{session ? (
				<p
					className={`text-center font-bold text-3xl ${
						valid ? "text-green-600" : "text-red-600"
					}`}
				>
					{valid
						? "account allowed"
						: "account suspected to be bot account, view the project's readme to resolve this"}
				</p>
			) : (
				<div className="text-center m-5 font-bold bg-black/75 backdrop-blur-lg p-10 rounded-xl align-items-center justify-items-center">
					<h2 className="text-2xl mb-5">
						Unplayit - make your minecraft ip great again
					</h2>
					<p>
						Unplayit is a tool to make your playit server ip into an
						.join.tectrix.dev ip with the default port so your players can join
						more easily, this probably makes the chance people join much bigger
						because it seems more professional. Currently only supports
						minecraft java servers hosted with playit. If you want more servers
						to be supported you can always make an issue in the github.
					</p>
					<p className="text-3xl m-5">
						Logging in is currently required as you can currently only register
						one server
					</p>
					<div className="flex flex-col items-center justify-content-center w-full">
						<SignIn />
					</div>
				</div>
			)}
		</main>
	);
}
