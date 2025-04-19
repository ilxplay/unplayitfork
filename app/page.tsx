import Image from "next/image";
import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import validateuser from "@/components/isusergoodenough";
import InputComponent from "@/components/input";

export default async function Home() {
  const session = await auth();
  const valid = await validateuser();
  return (
    <>
      {session ? (
        <div>
          {valid ? (
            <>
              <InputComponent />
              <Image
                className="w-5/6 mx-auto my-5 rounded-xl"
                src="/instruction.png"
                width={3200}
                height={3200}
                quality={100}
                alt="tutorial"
              />
            </>
          ) : (
            <p className="text-center font-bold text-3xl text-red-600">
              account suspected to be bot account, view the project's readme to
              resolve this
            </p>
          )}
        </div>
      ) : (
        <div className="text-center m-5 font-bold bg-black/75 backdrop-blur-lg p-10 rounded-xl align-items-center justify-items-center">
          <h2 className="text-2xl mb-5">
            Unplayit - make your minecraft ip great again
          </h2>
          <p>
            Unplayit is a tool to make your playit server ip into a .tectrix.dev
            ip with the default port so your players can join more easily, this
            probably makes the chance people join much bigger because it seems
            more professional. Currently only supports minecraft java servers
            hosted with playit. If you want more servers to be supported you can
            always make an issue in the github.
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
    </>
  );
}
