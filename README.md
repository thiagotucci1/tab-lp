# TAB — Landing Page

Landing page dedicada do NewMode TAB (Tactical Analytics Base), pra conversão (CRO): 1 objetivo só
(agendar uma conversa). É um recorte autocontido de `index.html` tirado do repositório do site
institucional da NewMode — sem build, sem dependência de npm, só HTML/CSS/JS direto.

Domínio pretendido: **tabgg.com** (ver "Deploy" abaixo — ainda não configurado).

Para ver localmente:

    python3 -m http.server 5500

e abrir http://127.0.0.1:5500/

## O que tem aqui

- `index.html` — a página inteira (hero, problema, calculadora de custo, mercado, solução,
  galeria do produto, como funciona, anti-intriga, prova e segurança, oferta Free/Pro, FAQ,
  formulário e rodapé).
- `assets/css/site.css` — o mesmo design system do site institucional da NewMode ("Liquid Glass
  Operacional"): vidro, um acento só (`#ff2400`), Agharti nos títulos, Chakra Petch no resto.
  Tem regra sobrando de outras páginas do site institucional (não usada aqui) — não é erro,
  só não foi aparado.
- `assets/js/site.js` + `assets/js/vendor/lenis.min.js` — scroll suave, animações de entrada,
  botão interativo, menu mobile. A calculadora de custo (seção "Faça a conta") tem lógica própria,
  inline no fim do `index.html`.
- `assets/img/tab/` — logos do TAB e as 5 capturas reais da galeria (já com nome, idade, Riot ID
  e Discord dos jogadores ocultados — ver commit "Galeria com capturas reais" no histórico).
- `fonts/` — Agharti Black UltraWide (títulos) e Chakra Petch (OFL, resto do texto).

Estrutura e copy seguem o documento **"TAB — Estrutura e Copy da Landing Page"**
(`NEWMODE/Documentos/TAB/`), com os ajustes de marca decididos em outubro/2026 (ver histórico de
commits do site institucional, de onde este recorte veio, pra todo o raciocínio por trás de cada
seção e as pendências legais/jurídicas ainda em aberto — autorização do elenco pra publicar os
números reais na seção "Prova e confiança", revisão jurídica do aviso da Riot no rodapé, etc.).

## Pendências

- [ ] Preencher "Treinos 7D", "Advertências ativas" e "Prospectos em teste" no próprio app (hoje em
      branco na tela Overview) e tirar um novo print pra galeria.
- [ ] E-mail do formulário: hoje `contato@newmode.com.br` (placeholder) — trocar pelo e-mail real,
      em `index.html` (atributo e no script no fim do arquivo).
- [ ] Domínio `tabgg.com`: comprar/confirmar e apontar o DNS pro projeto Vercel.
- [ ] Preço: decisão já tomada de ficar fora da página (convite pra conversa).
- [ ] Autorização do elenco + jurídico pra publicar os números reais da seção "Prova e confiança"
      (6 jogadores, 404 check-ins/outs, 1.914 rounds — já estão na página, mas a autorização
      específica pra esse uso não foi confirmada).
- [ ] Revisão jurídica do aviso de marca da Riot Games no rodapé.
- [ ] Linha do Coach/Admin na tabela de acesso por perfil (seção "Feito para o time") — o doc
      original marca como pendente de ajuste final.

## Deploy

```bash
npx vercel deploy --prod
```

Sem build command nem output directory — é estático na raiz. Depois de criar o projeto na Vercel,
aponte o domínio `tabgg.com` em Project Settings → Domains.
