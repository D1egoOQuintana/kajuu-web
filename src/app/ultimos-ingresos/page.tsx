import { redirect } from "next/navigation";

export default function NewArrivalsRedirectPage(): never {
  redirect("/catalogo?filter=new");
}
