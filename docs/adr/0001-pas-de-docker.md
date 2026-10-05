# ADR 0001 : Pas de Docker en V1

- **Statut** : acceptée
- **Date** : 2026-10-05

## Contexte

Le portfolio est une application Next.js unique, sans base de données ni service annexe. Elle est déployée sur Vercel, qui build le projet lui-même et n'utilise pas d'image Docker. Je développe seul, sur Windows.

Le principal problème que Docker résoudrait, « ça marche chez moi mais pas ailleurs », vient surtout des différences de version de Node et de dépendances.

## Décision

On n'utilise pas Docker. La cohérence entre environnements est assurée par :

- `.nvmrc` (Node 24) pour le local et la CI ;
- `engines.node` dans `package.json`, lu par Vercel ;
- `package-lock.json` commité, installé avec `npm ci` en CI.

## Conséquences

**Positives**
- Moins de configuration à maintenir.
- Hot reload rapide en local (pas de volume monté, qui ralentit sur Windows).
- Local, CI et production tournent sur la même version de Node.

**Négatives**
- Il faut installer Node 24 sur chaque machine de dev (via nvm).
- Pas d'image prête à l'emploi en cas d'hébergement hors Vercel.

## Alternatives écartées

- **Docker pour le dev local** : complexité sans bénéfice, puisqu'il n'y a qu'un seul service.
- **Dev Container** : même constat, utile surtout en équipe.

## Quand revoir cette décision

- Hébergement hors Vercel (VPS, serveur à Madagascar…) : Next propose `output: "standalone"`, et un Dockerfile s'ajoute facilement.
- Ajout de services à faire tourner en local (base de données, etc.) : un `docker-compose` limité à ces services pourra alors se justifier.