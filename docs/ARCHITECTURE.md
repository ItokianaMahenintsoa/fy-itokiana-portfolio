# Architecture

Ce document décrit comment le portfolio est construit et les règles à respecter pour qu'il reste simple. Les décisions importantes sont détaillées dans [`docs/adr/`](adr/).

## 1. Principes

- **Règle d'or** : si un élément n'aide pas le client à comprendre qui je suis ou à me contacter, on le retire.
- **Sobriété** : peu d'éléments, beaucoup d'espace, une seule police, une seule couleur d'accent.
- **Performance** : objectif Lighthouse ≥ 95 sur les 4 scores.
- **Pas de dépendance sans raison** : chaque ajout doit se justifier.

## 2. Rendu : statique en V1

- En V1, toutes les pages sont générées au build, pour chaque langue (`generateStaticParams`).
- Aucun serveur, aucune API, aucune base de données à l'exécution : Vercel sert des fichiers statiques.
- Ce n'est pas un choix définitif. L'architecture en couches permet d'ajouter plus tard une base de données, un CMS ou un formulaire **sans tout réécrire** :
  - seule la façon de récupérer le contenu changerait (`data/` serait remplacé par des appels à une source externe) ;
  - les composants, eux, resteraient identiques.
- Toute évolution de ce type fait l'objet d'une nouvelle ADR avant d'être codée.

## 3. Couches et dépendances

```
app/[locale]/          assemble les sections, gère metadata et SEO
      ↓
components/layout/     Header, Footer
components/sections/   Hero, StackMarquee, Projects, About, Contact
      ↓
components/ui/         briques réutilisables
      ↓
data/  +  messages/    le contenu
```

Les dépendances vont **uniquement vers le bas** :

- `ui/` n'importe jamais `sections/` ni `layout/`.
- Une section n'importe jamais une autre section.
- `data/` et `messages/` n'importent aucun composant.
- `app/` est le seul endroit qui assemble la page.

Conventions : un composant par fichier, export nommé, nom en PascalCase. Aucun `any`.

## 4. Server et Client Components

- **Server Components par défaut.** Ils n'envoient aucun JavaScript au navigateur.
- `"use client"` uniquement pour ce qui est animé ou interactif : `Header` (sticky), `LocalClock`, `WordTicker`, `Reveal`.
- On place `"use client"` le plus bas possible dans l'arbre. `Reveal` est un client component qui enveloppe du contenu rendu côté serveur, sans le transformer en client component.
- `LocalClock` s'affiche après le montage, pour éviter les erreurs d'hydratation.

## 5. Contenu : `data/` contre `messages/`

| `data/` (ne se traduit pas)           | `messages/` (se lit et se traduit) |
| ------------------------------------- | ---------------------------------- |
| slugs, URLs, chemins d'images         | titres, descriptions, catégories   |
| noms de technos, email, liens sociaux | labels, boutons, textes de section |

Les deux sont reliés par une clé. Par exemple, le projet `tsiahy` déclaré dans `data/projects.ts` lit ses textes dans `messages/fr.json` sous `projects.items.tsiahy`. La forme exacte des types sera fixée à l'étape 6.

**Aucun texte en dur dans les composants.**

## 6. Internationalisation

- `next-intl`, routes `/fr` (par défaut) et `/en`. La racine `/` redirige vers `/fr` (`src/proxy.ts`).
- La langue est lue depuis l'URL avec `next/root-params` (Next.js 16.3 et plus), dans `src/i18n/request.ts`. On n'utilise pas `setRequestLocale`, déprécié.
- `generateStaticParams` dans `src/app/[locale]/layout.tsx` génère une page statique par langue.
- L'attribut `lang` de `<html>` suit la langue de la route.
- Les textes sont rangés par composant dans `messages/fr.json` et `messages/en.json`.
- Les clés de traduction sont typées (`src/global.ts`), avec `fr.json` comme référence : une clé inconnue fait échouer le typecheck.

## 7. Styles

- Tailwind CSS v4, configuration **uniquement** dans `src/app/globals.css` (`@theme`). Il n'y a pas de `tailwind.config.js`.
- La palette Tailwind par défaut est désactivée : seuls les tokens du projet existent.
- Aucune couleur en dur (hex, rgb) dans les composants.
- L'accent menthe est réservé à la pastille « Disponible » et au point du logo.
- Une seule police : Outfit, en graisses 300, 400 et 500.

## 8. Animations

- Courbe par défaut : `[0.2, 0.7, 0.2, 1]`.
- On anime **uniquement** `transform` et `opacity`, jamais `width`, `height` ou `top`.
- Boucles (bandeau, pulse, indicateur de scroll) : en CSS. Entrées et reveals : avec Motion.
- Mouvement réduit respecté partout : `MotionConfig reducedMotion="user"` côté Motion, `@media (prefers-reduced-motion)` côté CSS.

## 9. Images

- `next/image` pour toutes les captures, en `.webp`, avec `sizes` et `placeholder`.
- Un `alt` descriptif est obligatoire.

## 10. Accessibilité et SEO

- HTML sémantique (`header`, `main`, `section`, `footer`), focus visible, contraste AA.
- `generateMetadata`, Open Graph, `sitemap.ts`, `robots.ts`, JSON-LD de type `Person`.

## 11. Qualité et environnements

- Node.js 26, fixé par `.nvmrc` et `engines` (utilisé aussi par Vercel).
- La CI GitHub Actions vérifie le formatage, puis lance lint, typecheck et build sur chaque PR et sur `main`.

| Environnement | Où                      | Quand                     |
| ------------- | ----------------------- | ------------------------- |
| Local         | `localhost:3000`        | en développement          |
| Preview       | URL Vercel de la PR     | à chaque push sur une PR  |
| Production    | [À COMPLÉTER : domaine] | à chaque merge sur `main` |
