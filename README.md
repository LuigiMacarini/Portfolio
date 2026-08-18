# Luigi Macarini · Portfolio

Portfolio pessoal, estilo Cyber Brutalism Editorial. Next.js 16 (App Router), TypeScript, Tailwind CSS v4. pt/en via `/pt` e `/en`, sem dependência de i18n externa (ver `src/app/[locale]/dictionaries.ts`).

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000) (redireciona para `/pt` ou `/en` conforme o navegador).

## Pendências de conteúdo

- **Foto**: `src/components/ui/PhotoFrame.tsx` mostra um placeholder até a foto real ser adicionada.
- **Currículo em PDF**: o link de download aponta para `public/resume/curriculo-luigi.pdf`, que ainda não existe. Adicionar o arquivo real nesse caminho.
- **Redes sociais**: LinkedIn, Instagram e Discord estão vazios em `src/lib/socials.ts` até termos os links reais.

## Variáveis de ambiente

Copiar `.env.example` para `.env.local` e preencher o que for usar:

- `RESEND_API_KEY`: opcional. Sem ela, o formulário de contato ainda funciona, mas cai para um `mailto:` pré preenchido em vez de enviar o email direto.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Space Grotesk / Inter / JetBrains Mono (`next/font/google`, substitutos gratuitos da Nebulica até termos os arquivos da fonte licenciada).
