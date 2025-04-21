import { auth } from "@/auth";

export default async function validateuser() {
	const session = await auth();
	const github = session?.profile || "no session";
	if (session !== undefined) {
		if (github.followers > 3) {
			return true;
		} else if (github.public_repos > 2) {
			return true;
		} else if (
			new Date(github.created_at) <
			new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000)
		) {
			return true;
		} else if (github.public_repos > 1 && github.followers > 1) {
			return true;
		} else {
			return true; // temporarily disable restrictions
		}
	} else {
		return undefined;
	}
}
