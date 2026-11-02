# Dawid Błaszczyk — portfolio

Strona wizytówka pod rekrutację na stanowisko Junior Software Engineer: wymagania z oferty zestawione z moimi projektami, opis stacku i tego, czego się nauczyłem, oraz dostępność. Wersje PL (`/`) i EN (`/en/`).

**Na żywo:** https://skiperpol.github.io/portfolio/

## Stack

Next.js 16 (App Router, statyczny eksport), React 19, TypeScript, Tailwind CSS 4, Vitest. Fonty: Mona Sans i JetBrains Mono.

## Uruchomienie

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # testy w Vitest
pnpm lint
pnpm build      # statyczna strona w out/
```

## Gdzie zmieniać treść

Cała treść siedzi w `src/content/`, komponenty tylko ją renderują:

| Plik | Co zawiera |
| :-- | :-- |
| `offer.ts` | Wymagania z oferty. Podmień plik, żeby dopasować stronę do innej oferty. |
| `projects.ts` | Projekty z GitHuba, zlecenia komercyjne i „inne projekty”. Pole `skills` decyduje o kropkach w macierzy wymagań. |
| `profile.ts` | Kontakt, doświadczenie, edukacja i sekcja o pracy z AI. |
| `schedule.ts` | Plan zajęć, z którego liczą się wolne okna i dzień w biurze. |
| `ui.ts` | Teksty interfejsu w obu językach. |

Testy w `src/content/content.test.ts` pilnują, żeby każde wymaganie miało dowód, a obie wersje językowe miały te same klucze.

## Wdrożenie na GitHub Pages

Workflow `.github/workflows/deploy.yml` przy każdym pushu na `main` uruchamia lint, testy i build, a potem publikuje katalog `out/`.

Jednorazowo: w repozytorium **Settings → Pages → Build and deployment → Source** ustaw **GitHub Actions**.

Strona działa pod `/portfolio`, więc workflow ustawia `NEXT_PUBLIC_BASE_PATH=/portfolio`. Lokalnie zmienna nie jest potrzebna.
