
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { redirect } from "next/navigation";
import LoginForm from "./Loginform";

export const dynamic = "force-dynamic";

export default async function Login(){
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/dashboard");
    }
    return <LoginForm />;
}