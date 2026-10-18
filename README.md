# Devfolio — Erick Victor

Devfolio em Next.js. O site abre direto no main, com uma entrada automática de cerca de 1,5 segundo: o nome sobe letra por letra, a linha azul do cargo se desenha, o restante do conteúdo aparece em sequência e o terminal "liga".

## Rodar o projeto

Requisitos: Node.js 20 ou mais recente.

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm start
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, descrição, sobre, e-mail, redes, projetos, tecnologias, trajetória | `src/lib/data.ts` |
| Ícones das tecnologias e redes | `src/lib/icons.tsx` |
| Cores, tipografia, espaçamentos | `src/app/globals.css` (bloco `:root`) |
| Tempos da entrada do main | `src/components/hero/Hero.tsx` (timeline do GSAP) |

Projetos, links das redes e demais textos ficam em `src/lib/data.ts`.

## Estrutura

```
src/
  app/            layout, página e CSS global
  components/
    hero/         main (nome, descrição, projetos, redes) e o terminal interativo
    sections/     Sobre, Projetos, Tecnologias, Trajetória, Contato
    Nav.tsx       navegação fixa
    Ambient.tsx   brilho azul de fundo
    SmoothScroll.tsx  Lenis + GSAP ScrollTrigger
  lib/            conteúdo, ícones, helpers de scroll
```

## Performance

- A animação espera a fonte carregar (no máximo 0,6 s) para o nome não "pular".
- Quem ativa "reduzir movimento" no sistema vê o main pronto, sem animação.

## Deploy

O jeito mais simples é a Vercel (grátis para projetos pessoais): suba o projeto para um repositório no GitHub, importe-o em vercel.com e clique em Deploy. Não precisa de configuração extra.
