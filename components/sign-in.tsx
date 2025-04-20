import { signIn, signOut, auth } from "@/auth";
import Image from "next/image";
import Logo from "../public/logo.png";

export default async function SignIn() {
	const session = await auth();
	return (
		<form
			action={async () => {
				"use server";
				if (session == null) {
					await signIn("github");
				} else {
					await signOut();
				}
			}}
		>
			<button
				className="bg-white md:mx-5 p-2 font-bold text-black rounded-lg cursor-pointer flex items-center justify-items-center gap-3 mx-5"
				type="submit"
			>
				<Image
					className="size-7 rounded-full"
					src={session?.user?.image || Logo}
					width={session?.user?.image ? 200 : undefined}
					height={session?.user?.image ? 200 : undefined}
					placeholder={session?.user?.image ? undefined : "blur"}
					alt="avatar"
				/>
				{session?.user?.name || "login with github"}
			</button>
		</form>
	);
}
