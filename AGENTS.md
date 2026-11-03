<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Site content (phones, address, brands, socials) lives in `src/lib/business.ts`; store hours in `src/lib/hours.ts` — edit there, never inline in pages. Why: one source of truth for every page and the WhatsApp links.
- Catalog items live in `src/lib/catalog.ts`; no backend. Inquiries (product, list, taller turno, contacto) open WhatsApp with a prefilled message. Why: the shop sells by WhatsApp, no checkout.
- The "Mi consulta" list is client-only state persisted in localStorage (`src/lib/quote-list.tsx`). Why: no accounts needed.
- Always-dark bands use the `ink` tokens so they stay dark in both themes; theme choice persists in localStorage and is applied by an inline head script.
