# Architecture

Ce document décrit comment le portfolio est construit et les règles à respecter pour qu'il reste simple. Les décisions importantes sont détaillées dans [`docs/adr/`](adr/).

## 1. Principes

- **Règle d'or** : si un élément n'aide pas le client à comprendre qui je suis ou à me contacter, on le retire.
- **Sobriété** : peu d'éléments, beaucoup d'espace, une seule police, une seule couleur d'accent.
- **Performance** : objectif Lighthouse ≥ 95 sur les 4 scores.
- **Pas de dépendance sans raison** : chaque ajout doit se justifier.

## 2. Rendu : 100 % statique

- Toutes les pages sont générées au build, pour chaque langue (`generateStaticParams`).
- Aucun serveur ni aucune API à l'exécution : Vercel sert des fichiers statiques.
- Tout besoin dynamique (formulaire, base de données…) doit faire l'objet d'une nouvelle ADR avant d'être ajouté.


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

| `data/` (ne se traduit pas)                 | `messages/` (se lit et se traduit)        |
| ------------------------------------------- | ----------------------------------------- |
| slugs, URLs, chemins d'images               | titres, descriptions, catégories         |
| noms de technos, email, liens sociaux       | labels, boutons, textes de section        |

Les deux sont reliés par une clé. Par exemple, le projet `tsiahy` déclaré dans `data/projects.ts` lit ses textes dans `messages/fr.json` sous `projects.items.tsiahy`. La forme exacte des types sera fixée à l'étape 6.

**Aucun texte en dur dans les composants.**

## 6. Internationalisation

- `next-intl`, routes `/fr` (par défaut) et `/en`.
- L'attribut `lang` de `<html>` suit la langue de la route.
- Les metadata (titre, description, Open Graph) sont traduites.
- Note : Next 16 a renommé `middleware.ts` en `proxy.ts`. L'intégration next-intl sera vérifiée dans sa documentation à jour à l'étape 2.

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

- Node.js 24, fixé par `.nvmrc` et `engines` (utilisé aussi par Vercel).
- La CI GitHub Actions lance lint, typecheck et build sur chaque PR et sur `main`.

| Environnement | Où                       | Quand                     |
| ------------- | ------------------------ | ------------------------- |
| Local         | `localhost:3000`         | en développement          |
| Preview       | URL Vercel de la PR      | à chaque push sur une PR  |
| Production    | [À COMPLÉTER : domaine]  | à chaque merge sur `main` |