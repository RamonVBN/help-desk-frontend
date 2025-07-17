import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/input";

import * as Card from '@/app/components/card'



export default function SignIn() {
  return (

    <>
      <form>
        <Card.Root className="gap-8">
        
        <div>
          <Card.Title title="Acesse o portal"/>
          <Card.Description description="Entre usando seu e-mail e senha cadastrados"/>
        </div>
        <div className="flex flex-col gap-4">

          <Input id="email" placeholder="exemplo@email.com" />

          <Input id="senha" placeholder="Digite sua senha" />
        </div>
        <Button variant={'default'}>Entrar</Button>
        </Card.Root>
      
      </form>


      <Card.Root className="gap-5">
        <div>
          <Card.Title title="Ainda não tem uma conta?" className="text-base" />
          <Card.Description description="Cadastre agora mesmo"/>
        </div>
        <Button variant={'secondary'} asChild>
          <Link href='/sign-up' className="font-bold">Criar Conta</Link>
        </Button>
      </Card.Root>
    </>

  );
}
