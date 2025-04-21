"use server";

import validateuser from "@/components/isusergoodenough";
import { auth } from "@/auth";
import { Vercel } from "@vercel/sdk";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

export default async function Dash({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const session = await auth();
	const uid = session?.profile?.id;
	const query = await searchParams;
	const { ply, port, word: subdomain, domain: domainIndex } = query;

	const domains = ["join", "a", "mc", "gg", "minecraft", "smp", "now"];
	const domain = domains[parseInt(domainIndex || "0") || 0];

	const isValidUser = await validateuser();
	if (!isValidUser) {
		return <p>Unauthorized</p>;
	}

	async function getapi() {
		const serverStatusResponse = await fetch(
			`https://api.mcsrvstat.us/2/${subdomain}.${domain}.tectrix.dev`
		);
		const serverStatus = await serverStatusResponse.json();

		if (serverStatus.online) {
			return (
				<div className="m-auto text-white flex flex-col items-center justify-center">
					<h1 className="text-4xl font-bold text-green-600 mb-4">
						Server Status
					</h1>
					<p className="text-lg text-white mb-2">
						Server is{" "}
						<span className="font-semibold text-green-500">online</span>!
					</p>
					<div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
						<p className="text-gray-800 mb-2">
							<span className="font-semibold">IP:</span> {serverStatus.ip}
						</p>
						<p className="text-gray-800 mb-2">
							<span className="font-semibold">Port:</span> {serverStatus.port}
						</p>
						<p className="text-gray-800 mb-2">
							<span className="font-semibold">Players:</span>{" "}
							{serverStatus.players.online}/{serverStatus.players.max}
						</p>
						<p className="text-gray-800">
							<span className="font-semibold">Version:</span>{" "}
							{serverStatus.version}
						</p>
					</div>
				</div>
			);
		} else {
			return (
				<div className="mt-5 size-full bg-black/25 backdrop-blur-lg text-white flex flex-col items-center justify-center">
					<h1 className="text-4xl font-bold text-red-600 mb-4">
						Server Status
					</h1>
					<p className="text-lg text-white">
						Server is{" "}
						<span className="font-semibold text-red-500">
							offline, it could be that your record needs some time to create.
							try coming back in 10 minutes
						</span>
						.
					</p>
				</div>
			);
		}
	}

	const vercel = new Vercel({ bearerToken: process.env.DNS || "" });

	// Verify DNS authentication
	try {
		await vercel.dns.getRecords({
			domain: "tectrix.dev",
			limit: "1",
			teamId: process.env.TEAMID || "",
			slug: "tectrixdev",
		});
	} catch (error: any) {
		console.error(error);
		if (error.statusCode === 403) {
			return (
				<p>DNS authentication failed. Please report this issue on GitHub.</p>
			);
		}
		return <p>Unexpected error. Please contact support.</p>;
	}

	const sql = neon(process.env.DATABASE_URL || "");

	try {
		// Check if a record already exists
		const existingRecord = await sql.query(
			"SELECT * FROM register WHERE uid = $1",
			[uid]
		);
		if (existingRecord.length > 0) {
			return (
				<>
					<p>
						Record already exists for this user: {existingRecord[0].full}.
						Editing records is not yet implemented.
					</p>
					{await getapi()}
				</>
			);
		}

		// Create a new DNS record
		const dnsRecordOptions = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.DNS}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: `_minecraft._tcp.${subdomain}.${domain}`,
				type: "SRV",
				srv: {
					port: parseInt(port || "25565"),
					priority: 10,
					weight: 10,
					target: ply,
				},
				comment: `unplayit, ${uid} ${ply} ${port} ${domain} valid: ${isValidUser}`,
			}),
		};

		const response = await fetch(
			`https://api.vercel.com/v2/domains/tectrix.dev/records?teamId=${process.env.TEAMID}`,
			dnsRecordOptions
		);
		const dnsData = await response.json();

		// I'm doing manual fetching here because the vercel sdk has a huge error; it doesn't accept the name property for srv records but it's required so yeah.
		await sql.query(
			'INSERT INTO register (uid, "full", dnsid, time, sub, domain) VALUES ($1, $2, $3, $4, $5, $6)',
			[
				parseInt(uid || "0"),
				`${subdomain}.${domain}.tectrix.dev`,
				dnsData.uid,
				Math.floor(Date.now() / 1000),
				subdomain,
				parseInt(domainIndex || "0"),
			]
		);
		return getapi();
	} catch (error: any) {
		console.error(error);
		return (
			<p>
				An error occurred. Please try again or contact support, your domain
				could be working though, try{" "}
				{`https://mcsrvstat.us/server/${subdomain}.${domain}.tectrix.dev`}
			</p>
		);
	}
}
