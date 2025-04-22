import { auth } from "@/auth";

export default async function validateUser() {
  const session = await auth();
  if (!session) {
    return null;
  }
  
  //in case you want more security later
  //checks if not null 
	//better using object then string for given purpose
	//const github = session.profile || {}; 
	
  /*
  return (
    github.followers > 3 || github.public_repos > 2 ||
    (new Date(github.created_at) < new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000)) ||
    (github.public_repos > 1 && github.followers > 1));
  */
  //make it simpler
  return true;
}
