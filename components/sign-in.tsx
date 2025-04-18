import { signIn, signOut, auth } from "@/auth";
import Image from "next/image";

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
				className="bg-white p-2 font-bold text-black rounded-lg cursor-pointer flex items-center justify-items-center gap-3"
				type="submit"
			>
				<Image
					className="size-7 rounded-full"
					src={session?.user?.image || "/logo.png"}
					width={200}
					height={200}
					alt="avatar"
				/>
				{session?.user?.name || "login with github"}
			</button>
		</form>
	);
}
