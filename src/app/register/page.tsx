
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";

export const dynamic = "force-dynamic";

export default async function Register() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/dashboard");
    }
    
    return <RegisterForm />;
}