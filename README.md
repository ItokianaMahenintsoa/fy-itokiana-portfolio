Mon portfolio de développeur full-stack freelance, basé à Antananarivo (Madagascar, UTC+3).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) · TypeScript strict
- [Tailwind CSS v4](https://tailwindcss.com) (configuration CSS-first)
- [Motion](https://motion.dev) pour les animations
- [next-intl](https://next-intl.dev) : français par défaut, anglais ensuite
- Police Outfit via `next/font`
- Déploiement sur [Vercel](https://vercel.com)

En V1, le site est entièrement statique : pas de base de données ni de CMS. Ce choix est amené à évoluer (voir [docs/adr/](docs/adr/)).

## Prérequis

- Node.js 24 (voir `.nvmrc`)
- npm

## Démarrer

```bash
nvm use
npm ci
npm run dev
```

Le site tourne sur http://localhost:3000.

## Scripts

| Commande            | Rôle                                                  |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Serveur de développement                              |
| `npm run build`     | Build de production                                   |
| `npm run start`     | Sert le build de production en local                  |
| `npm run lint`      | Vérifie le code avec ESLint                           |
| `npm run typecheck` | Génère les types des routes et vérifie le TypeScript  |

## Organisation

```
src/
  app/[locale]/       pages et layout, une version par langue
  components/
    layout/           Header, Footer
    sections/         sections de la page
    ui/               briques réutilisables
  data/               données non traduites (projets, stack, liens)
  i18n/               configuration next-intl
messages/             textes FR et EN
public/projects/      captures des projets (.webp)
docs/                 architecture et décisions (ADR)
```

Le détail est dans [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Workflow

- `main` est protégée et toujours déployable.
- Une branche par changement (`feat/…`, `fix/…`, `chore/…`, `docs/…`), une pull request, puis un squash merge.
- Commits au format [Conventional Commits](https://www.conventionalcommits.org/fr/).
- La CI (lint, typecheck, build) doit passer avant tout merge.
- Chaque PR a sa preview Vercel
