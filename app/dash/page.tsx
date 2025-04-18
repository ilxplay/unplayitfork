import validateuser from "@/components/isusergoodenough";

export default async function Dash({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const query = await searchParams;
	const ply = query.ply;
	const port = query.port;
	const subdomain = query.word;
	const valid = await validateuser();
	return valid ? "true" : "unauthorized";
}
