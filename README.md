# TAB — Landing Page

Landing page do NewMode TAB (Tactical Analytics Base), pensada para conversão: um objetivo só,
**agendar uma demo**. HTML/CSS/JS direto, sem build e sem npm.

Domínio pretendido: **tabgg.com** (ainda não apontado — ver "Deploy").

Para ver localmente:

    python3 -m http.server 5500

e abrir http://127.0.0.1:5500/

## Versão atual (v2, nov/2026)

Reescrita a partir do protótipo comercial `tab-commercial.html` (NEWMODE/Documentos/TAB). Regra:
**a página só fala do que existe no protótipo**. Decisões tomadas com o Thiago:

- Substitui a v1 (estrutura do doc "TAB — Estrutura e Copy da Landing Page", out/2026).
- CTA único: agendar demo. Comprador: o coach influencia, o dono/gestor paga. A página fala primeiro com
  o coach (produto) e depois com o dono (gestão + calculadora).
- Tráfego: prospecção direta e redes da NewMode (visitante morno), por isso a página é mais curta.
- Visual híbrido: vidro e acento da NewMode (`site.css`) e telas do produto recriadas em HTML no
  estilo do app (`tab.css`), **sempre com dados fictícios** (nicks do protótipo) e etiqueta "Dados fictícios".
- Planos: Free (Overview, gestão do roster, agenda, dados básicos da equipe) e Pro (o resto do protótipo).
  Sem preço na página. Founder customers têm condições especiais (citado sem detalhar). Não citar
  concorrentes pelo nome (ex.: tracker.gg).
- Saíram da v1: tabela "o mercado hoje", cena da "terça 22h40", capturas reais do app, números reais do
  elenco e tudo de psicólogo/check-in (não existe no protótipo). A calculadora ficou.

### Estrutura

Hero (alertas da semana) → faixa de confiança → problema → produto (performance, evolução/H2H,
pick/ban, AI Insights, relatórios) → gestão (multi-equipe, painel de gestão, agenda, auditoria) →
calculadora → anti-intriga e dados → depoimentos (escondido) → como começar → planos → FAQ →
formulário → rodapé.

## Arquivos

- `index.html` — a página inteira. A calculadora e o envio do formulário estão inline no fim.
- `assets/css/site.css` — design system "Liquid Glass" da NewMode (compartilhado com o site institucional;
  tem regra de outras páginas sobrando, não é erro).
- `assets/css/tab.css` — componentes desta página: telas do app (`.app-*`), gestão, planos, depoimentos.
- `assets/js/site.js` + `vendor/lenis.min.js` — scroll suave, animação de entrada, botões.
- `assets/img/tab/` — ícone, lockup e imagem de compartilhamento (og).
- `fonts/` — as fontes do app: Spline Sans (títulos, Bold 700 — a fonte vai de 300 a 700, não tem Black)
  e Geist (texto, Regular 400; itálico só no bloco de depoimentos). Variáveis, licença OFL. Trocadas em
  nov/2026 no lugar de Agharti + Chakra Petch. A palavra TAB segue Bold e caixa alta, na fonte do contexto.

## Formulário

Envia para o Formspree (`https://formspree.io/f/mzeeqyde`) sem sair da página. Tem campo anti-spam
(`_gotcha`) e assunto fixo. **No primeiro envio, o Formspree manda um e-mail de confirmação para a conta
dona do formulário**: é preciso confirmar para os pedidos começarem a chegar. O plano grátis aceita
50 envios por mês.

## Medição

Vercel Web Analytics (sem cookies) em `index.html` e `obrigado.html`. Depois de um envio bem-sucedido, o
formulário leva para `/obrigado` (`cleanUrls` no `vercel.json`). **Taxa de conversão = visitas em
`/obrigado` ÷ visitas em `/`**. O evento `lead_enviado` também é disparado, mas a Vercel só registra
eventos personalizados em planos pagos. Para funcionar: ativar Analytics no painel do projeto `tab-lp`.

## Auditoria visual (nov/2026)

Contraste do CTA (3,82:1 → 5,28:1), cinza `--faint` (3,29:1 → 5,25:1, usado em rótulos do formulário),
peso do texto de apoio 300 → 400, vermelho saturado reservado ao CTA e à marca (marcadores decorativos
com menos intensidade). Ainda não feito: fontes em WOFF2 (precisa do fontTools) e enxugar a seção de
produto (5 blocos iguais seguidos; decisão de estrutura pendente).

Prova social: o produto ainda não foi a mercado (MVP em fase final), então não há depoimentos de
clientes. A página se apoia no produto mostrado, no uso pela comissão da NewMode, na conformidade com a
Riot e no programa de founder customers. Não inventar números, logos ou depoimentos.

## Heurísticas de usabilidade (nov/2026)

Auditoria com a skill `ux-heuristics` (Krug + Nielsen). Aplicado:
- Menu marca a seção visível (`aria-current`), para orientar a pessoa na página.
- Formulário: validação própria em português, embaixo de cada campo, ao sair do campo e no envio
  (sem JS, vale a validação nativa do navegador); foco vai para o primeiro campo com erro; botão
  desabilitado enquanto envia; rótulo do select se comporta como os outros campos.
- Barra fixa do mobile some quando o formulário está na tela (não cobre o botão de envio).
- Botão do header com 44px de altura (área de toque).
- Parágrafos da seção de produto cortados pela metade (repetiam os bullets); "founder customers"
  explicado em português.
- Pendente por decisão: o header só tem ícones (sem o nome TAB escrito), escolha do Thiago.

## Pendências

- [ ] **Depoimentos** (`#depoimentos`, escondido com `hidden`): texto, nome e função do coach da NewMode
      (autorização pedida) e a fala literal do Victor Goossens do vídeo da EWC (com o original, se for em
      inglês). Preencher e remover o `hidden`. Manter a nota de que ele não tem relação com o TAB.
- [ ] Confirmar o Formspree (primeiro envio) e testar o recebimento.
- [ ] Domínio `tabgg.com`: comprar/confirmar e apontar o DNS para o projeto Vercel `tab-lp`.
- [ ] FAQ "o que acontece com meus dados se eu cancelar": política de exportação/exclusão ainda em
      formalização.
- [ ] Revisão jurídica do aviso de marca da Riot Games no rodapé.

## Deploy

O repositório está ligado ao projeto Vercel `tab-lp`: cada push na `main` publica em
https://tab-lp.vercel.app. Manual: `npx vercel deploy --prod`. Sem build command nem output directory.
