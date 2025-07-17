import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/input";

import * as Card from '@/app/components/card'



export default function SignUp() {
    return (

        <>
            <form>
                <Card.Root className="gap-8">

                    <div>
                        <Card.Title title="Crie sua conta" />
                        <Card.Description description="Informe seu nome, e-mail e senha" />
                    </div>
                    <div className="flex flex-col gap-4">

                        <Input id="nome" placeholder="Digite seu nome completo"/>

                        <Input id="email" placeholder="exemplo@email.com" />

                        <Input id="senha" placeholder="Digite sua senha" />
                    </div>
                    <Button variant={'default'}>Cadastrar</Button>
                </Card.Root>

            </form>


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
