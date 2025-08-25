import Link from "next/link";
import { Button } from "../../../components/ui/button";

import * as Card from '@/components/card'
import { AuthForm } from "@/components/authForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function SignUp() {

    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    if (token) {
       return redirect("/calleds")
    }

    return (
        <>
            <Card.Root className="gap-8">

                <div>
                    <Card.Title title="Crie sua conta" />
                    <Card.Description description="Informe seu nome, e-mail e senha" />
                </div>

                <AuthForm />
            </Card.Root>


            <Card.Root className="gap-5">
                <div>
                    <Card.Title title="Já uma conta?" className="text-base" />
                    <Card.Description description="Entre agora mesmo" />
                </div>
                <Button variant={'secondary'} asChild>
                    <Link href='/sign-in' className="font-bold">Acessar Conta</Link>
                </Button>
            </Card.Root>
        </>

    );
}
