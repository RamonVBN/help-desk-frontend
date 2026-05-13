# HelpDesk Frontend

Frontend de uma aplicação de gerenciamento de chamados de suporte de T.I. desenvolvido com **Next.js**, focado em organização, gerenciamento e acompanhamento de tickets de suporte técnico.

---

# 📋 Sobre o projeto

O **HelpDesk Frontend** é a interface web da aplicação HelpDesk, responsável por permitir que usuários e técnicos possam:

* Criar chamados de suporte
* Acompanhar status dos chamados
* Atualizar informações de atendimento
* Gerenciar horários de atendimento dos técnicos
* Fazer upload de imagem de perfil
* Autenticar usuários
* Administrar atendimentos de forma prática e intuitiva

A aplicação foi construída utilizando tecnologias modernas do ecossistema React e Next.js.

---

## Deploy

[https://help-desk-frontend-seven.vercel.app/](https://help-desk-frontend-seven.vercel.app/)

---

## Backend
API REST da aplicação HelpDesk:

https://github.com/ramonvbn/help-desk-backend

---

# 🚀 Tecnologias utilizadas

## Frontend

* [Next.js 16](https://nextjs.org/)
* [React 19](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [TailwindCSS 4](https://tailwindcss.com/)
* [Radix UI](https://www.radix-ui.com/)
* [ShadcnUi](https://ui.shadcn.com/)
* [React Hook Form](https://react-hook-form.com/)
* [Zod](https://zod.dev/)
* [TanStack Query](https://tanstack.com/query)
* [Axios](https://axios-http.com/)
* [date-fns](https://date-fns.org/)

## Testes

* [Vitest](https://vitest.dev/)
* [Testing Library](https://testing-library.com/)
* [Playwright](https://playwright.dev/)
* [MSW](https://mswjs.io/)

---

# 📁 Estrutura do projeto

```bash
src/
 ├── app/                # Rotas e páginas da aplicação
 ├── components/         # Componentes reutilizáveis
 ├── hooks/              # Hooks customizados
 ├── services/           # Configurações de API e serviços
 ├── utils/              # Funções utilitárias
 ├── contexts/           # Context API
 ├── types/              # Tipagens TypeScript
 ├── validations/        # Schemas Zod
 └── tests/              # Testes da aplicação
```

---

# ⚙️ Funcionalidades

## 🔐 Autenticação

* Login de usuários
* Persistência de autenticação
* Controle de acesso
* Uso de JWT

## 📞 Chamados

* Criação de chamados
* Atualização de status
* Visualização detalhada

## 👨‍🔧 Técnicos

* Gerenciamento de disponibilidade
* Controle de horários de atendimento
* Associação de chamados

## 🖼️ Uploads

* Upload de imagem de perfil
* Validação de tamanho e tipo de arquivo

## 🌙 Interface

* UI responsiva
* Componentes acessíveis com Radix UI

---

# 🧪 Testes

A aplicação possui testes unitários e testes end-to-end.

## Executar testes unitários

```bash
npm run test
```

## Executar testes em modo watch

```bash
npm run test:watch
```

## Executar interface do Vitest

```bash
npm run test:ui
```

## Executar testes E2E

```bash
npm run test:e2e
```

## Executar UI do Playwright

```bash
npm run test:e2e:ui
```

---

# ▶️ Como executar o projeto

## Pré-requisitos

* Node.js 18+
* npm, yarn, pnpm ou bun

## Clonar o repositório

```bash
git clone https://github.com/seu-usuario/help-desk-frontend.git
```

## Entrar na pasta do projeto

```bash
cd help-desk-frontend
```

## Instalar dependências

```bash
npm install
```

## Configurar variáveis de ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:3000
```

---

# 📦 Scripts disponíveis

| Script                | Descrição                           |
| --------------------- | ----------------------------------- |
| `npm run dev`         | Inicia ambiente de desenvolvimento  |
| `npm run build`       | Gera build de produção              |
| `npm run start`       | Inicia aplicação em produção        |
| `npm run lint`        | Executa lint                        |
| `npm run test`        | Executa testes unitários            |
| `npm run test:watch`  | Executa testes em modo watch        |
| `npm run test:ui`     | Abre interface visual do Vitest     |
| `npm run test:e2e`    | Executa testes E2E                  |
| `npm run test:e2e:ui` | Abre interface visual do Playwright |

---

# 🎨 Padrões utilizados

* Componentização
* Responsividade
* Tipagem forte com TypeScript
* Validação com Zod
* Gerenciamento de estado servidor com React Query
* Formulários com React Hook Form

---

# 👨‍💻 Autor

Desenvolvido por Ramon Victor Barros Nunes.

* GitHub: [https://github.com/RamonVBN](https://github.com/RamonVBN)
* LinkedIn: [https://linkedin.com/in/ramon-barros-4a107837a](https://linkedin.com/in/ramon-barros-4a107837a)
