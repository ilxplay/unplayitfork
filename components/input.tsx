import Form from "next/form";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export default async function InputComponent() {
	const cookiejar = await cookies();
	return (
		<>
			<Form
				action="/dash"
				className="flex gap-2 items-center px-96 mt-10"
			>
				<input
					type="text"
					name="ply"
					placeholder="playit domain"
					className="flex-1 p-2 border border-gray-300 rounded bg-black/25 backdrop-blur-lg"
					title="the playit name you can find in playit like the screenshot"
					required
					pattern=".*"
				/>
				<input
					type="number"
					name="port"
					placeholder="Port (0-65535)"
					className="w-40 p-2 border border-gray-300 rounded bg-black/25 backdrop-blur-lg"
					title="the port from playit"
					required
					min="0"
					max="65535"
				/>
				<p>{"->"}</p>
				<input
					type="text"
					name="word"
					placeholder="subdomain"
					className="flex-1 p-2 border border-gray-300 rounded bg-black/25 backdrop-blur-lg"
					title="your smp/server name or the part you want in your ip"
					required
					pattern="[a-z]*"
				/>
				<p
					className="flex-1 p-2 border border-gray-300 rounded bg-black/25 backdrop-blur-lg select-none"
					title="this cannot be changed, for custom domains please make an issue on the github"
				>
					.join.tectrix.dev
				</p>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Add
				</button>
			</Form>
		</>
	);
}
