import Playground from "./components/Playground";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/playground/declare-a-resource");
}
