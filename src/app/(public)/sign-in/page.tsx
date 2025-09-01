import Link from "next/link";
import { Button } from "../../../components/ui/button";

import * as Card from '@/components/card'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/pages/authPages/authForm";


export default async function SignIn() {

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (token) {
    return redirect("/calleds")
  }

  return (

    <>
      <Card.Root className="gap-8">

        <div>
          <Card.Title title="Acesse o portal" />
          <Card.Description description="Entre usando seu e-mail e senha cadastrados" />
        </div>

        <AuthForm/>
        
      </Card.Root>

      <Card.Root className="gap-5">
        <div>
          <Card.Title title="Ainda não tem uma conta?" className="text-base" />
          <Card.Description description="Cadastre agora mesmo" />
        </div>
        <Button variant={'secondary'} asChild>
          <Link href='/sign-up' className="font-bold">Criar Conta</Link>
        </Button>
      </Card.Root>
    </>

  );
}
