import validateuser from "@/components/isusergoodenough";
import { auth } from "@/auth";

export default async function Dash({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const uid = session?.profile?.id;
  const query = await searchParams;
  const ply = query.ply;
  const port = query.port;
  const subdomain = query.word;
  const domains: Array<string> = [
    "join",
    "a",
    "mc",
    "gg",
    "minecraft",
    "smp",
    "now",
  ];
  const index = parseInt(query.domain?.toString() || "0");
  const domain = domains[index];
  const valid = await validateuser();
  return valid ? (
    <p>
      {uid}
      {subdomain}.{domain}.tectrix.dev
    </p>
  ) : (
    <p>unauthorized</p>
  );
}
