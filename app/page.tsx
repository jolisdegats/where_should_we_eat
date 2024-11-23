import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const username = cookieStore.get("wswe_username");
  return username ? redirect("/wheel") : redirect("/welcome");
}
