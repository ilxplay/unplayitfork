import Form from "next/form";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { Rubik_Mono_One } from "next/font/google";

export default async function InputComponent() {
  const cookiejar = await cookies();
  return (
    <>
      <Form action="/dash" className="flex gap-2 items-center px-96 mt-10">
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
        <p className="font-bold">&rarr;</p>
        <input
          type="text"
          name="word"
          placeholder="subdomain"
          className="flex-1 p-2 border border-gray-300 rounded bg-black/25 backdrop-blur-lg"
          title="your smp/server name or the part you want in your ip"
          required
          pattern="[a-z]*"
        />
        <select
          className="flex-1 p-2 border border-gray-300 rounded bg-black/25 backdrop-blur-lg select-none"
          title="choose your domain"
          name="domain"
        >
          <option defaultChecked value={0}>
            .join.tectrix.dev
          </option>
          <option value={1}>.a.tectrix.dev</option>
          <option value={2}>.mc.tectrix.dev</option>
          <option value={3}>.gg.tectrix.dev</option>
          <option value={4}>.minecraft.tectrix.dev</option>
          <option value={5}>.smp.tectrix.dev</option>
          <option value={6}>.now.tectrix.dev</option>
          <option
            title="only availible on request, see the readme"
            disabled
            value={8}
          >
            .tectrix.dev
          </option>
        </select>
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
