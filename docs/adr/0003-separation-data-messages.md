# ADR 0003 : Séparation entre `data/` et `messages/`

- **Statut** : acceptée
- **Date** : 2026-10-05

## Contexte

Le site est bilingue (FR puis EN) et aucun texte ne doit être écrit en dur dans les composants. Certaines informations se traduisent (titres, descriptions), d'autres non (URLs, chemins d'images, noms de technos). Mélanger les deux crée des doublons entre `fr.json` et `en.json`, et des oublis lors des mises à jour.

## Décision

- **`data/`** contient ce qui ne se traduit pas, sous forme de fichiers TypeScript typés : slugs, URLs, chemins d'images, noms de technos, email, liens sociaux.
- **`messages/`** contient tout ce qui se lit et se traduit : titres, descriptions, catégories, labels, textes des boutons.
- Les deux sont reliés par une **clé** (le slug). Exemple de principe (la forme exacte sera fixée à l'étape 6) :

```ts
// data/projects.ts : les infos fixes
{ slug: "tsiahy", image: "/projects/tsiahy.webp" }
```

```json
// messages/fr.json : les textes
"projects": { "items": { "tsiahy": { "name": "Tsiahy", "description": "…", "category": "…" } } }
```

## Conséquences

**Positives**
- Une URL ou une image ne se modifie qu'à un seul endroit, quelle que soit la langue.
- Les fichiers de traduction ne contiennent que du texte : faciles à relire et à traduire.
- Si on passe un jour à un CMS ou à une base de données (voir ADR 0002), seule la source de `data/` change. Les composants restent identiques.

**Négatives**
- Ajouter un projet demande de toucher deux endroits : `data/` et chaque fichier de `messages/`.
- Une clé oubliée dans une langue ne sera détectée qu'à l'exécution, sauf si on type les messages (à étudier à l'étape 2 avec next-intl).

## Alternatives écartées

- **Tout dans `messages/`** : les URLs et les images seraient dupliquées dans chaque langue.
- **Un fichier par langue dans `data/`** : la logique de traduction serait dispersée hors de next-intl.