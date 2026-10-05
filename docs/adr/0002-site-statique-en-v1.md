# ADR 0002 : Site statique en V1

- **Statut** : acceptée
- **Date** : 2026-10-05

## Contexte

La V1 du portfolio présente qui je suis, trois projets et un moyen de me contacter. Son contenu change rarement et je suis le seul à le modifier. Objectif : Lighthouse ≥ 95 sur les 4 scores, et un coût d'hébergement nul ou minimal.

## Décision

En V1, le site est **entièrement statique** :

- toutes les pages sont générées au build, pour chaque langue ;
- le contenu vit dans le repo (`data/` et `messages/`) ;
- le contact se fait par `mailto`, sans formulaire.

## Conséquences

**Positives**
- Performance maximale : du HTML pré-généré, servi depuis un CDN.
- Aucune surface d'attaque serveur, aucun secret à gérer.
- Coût d'hébergement minimal.

**Négatives**
- Chaque modification de contenu passe par un commit et un déploiement.
- Pas de formulaire de contact : un `mailto` convertit un peu moins bien qu'un formulaire.

## Évolutions envisageables

Cette décision n'est **pas définitive**. Grâce à la séparation entre le contenu et les composants (voir ADR 0003), on peut faire évoluer le site sans réécrire l'interface :

| Besoin                                  | Piste probable                                  |
| --------------------------------------- | ----------------------------------------------- |
| Formulaire de contact                   | Route serveur Next.js + Resend, sans base de données |
| Études de cas détaillées, blog          | Fichiers MDX dans le repo, ou CMS headless      |
| Modifier le contenu sans toucher au code | CMS headless                                    |
| Espace d'administration                 | Base de données + authentification              |

Chacune de ces évolutions fera l'objet de sa propre ADR avant d'être codée.

## Quand revoir cette décision

Dès qu'un des besoins ci-dessus devient réel, ou si le `mailto` s'avère être un frein à la prise de contact.