# KalanCode (nom de travail)

Projet open source pour rendre l'apprentissage de l'algorithmique, de la programmation et de la cybersécurité accessible aux débutants grâce au Bamanankan en alphabet latin et au N'Ko.

## Objectif initial
Valider une première expérience d'apprentissage avec des débutants avant d'élargir le produit.

## Première version (MVP)
- Choix de la variante d'écriture : Bamanankan latin ou N'Ko.
- Leçons courtes, exemples concrets et exercices interactifs.
- Initiation aux algorithmes et à la sécurité numérique.
- Suivi simple de la progression.
- Contenus séparés du code de l'application et relus par la communauté.

## Statut
Étape 1 : Fondations, spécifications et premier prototype interactif validé.

## Démarrage rapide du prototype (Frontend)

```bash
cd frontend
npm install
npm run dev
```

L'application démarre sur `http://127.0.0.1:5173/`.

### Fonctionnalités du prototype
- **Bilinguisme et écriture native** : Bascule instantanée entre **Bamanankan (Alphabet latin)**, **ߒߞߏ (N'Ko RTL)** et **Français**.
- **Typographie et rendu adapté** : Intégration de `Noto Sans NKo` et gestion dynamique de la direction LTR/RTL (`dir="rtl"`).
- **Leçons pédagogiques illustrées** :
  1. *Aligoritimu ye mun ye ? (Taji kɛcogo)* — Séquençage et logique de la préparation du thé.
  2. *Kɛtɔw ani Saritiw (Ni... o kɔ...)* — Conditions et arborescences logiques (If / Else).
  3. *Danbɛ Kisili (Hameçonnage / Phishing)* — Simulation d'un faux SMS de paiement mobile (Orange Money / Moov).
- **Atelier klncd & Interpréteur V1.0** : Exécution sandboxée sans `eval()` avec console interactive, supportant `klncd.S3b3n()` (sortie) et `klncd.Doon()` (saisie asynchrone non-bloquante), préservant les alphabets Bamanankan et N'Ko.
- **Simulateur algorithmique interactif** : Ordonnancement visuel avec exécution pas à pas et repères lumineux.
- **Glossaire bilingue** : Définition des termes techniques informatiques.
- **Gamification & Persistance** : Étoiles, séries (streak), badges débloquables, effets sonores procéduraux Web Audio et confettis.
- **Architecture de contenu découplée** : Contenus structurés dans `src/data/lessons.ts` pour faciliter les relectures et traductions communautaires.

## Structure du projet

```
KalanCode/
├── README.md              ← vous êtes ici
├── LICENSE                ← licence du code source (MIT)
├── CONTENT_LICENSE.md     ← licence des contenus pédagogiques
├── CONTRIBUTING.md        ← guide de contribution
├── CODE_OF_CONDUCT.md     ← code de conduite de la communauté
├── INITIATORS.md          ← fondateurs du projet
├── CONTRIBUTORS.md        ← tous les contributeurs
│
├── docs/                  ← documentation technique et produit
│   ├── PRODUCT_SPEC.md
│   ├── CURRICULUM_SPEC.md
│   ├── KLNCD_V1_SPEC.md
│   └── KLNCD_GRAMMAR_V1.md
│
├── app/                   ← point d'entrée vers le code de l'application
│   └── README.md          ← (le code réel est dans frontend/)
│
├── frontend/              ← code source de l'application React/Vite
│   └── src/
│
├── learning/              ← contenus pédagogiques communautaires
│   └── README.md
│
└── exercises/             ← exercices interactifs communautaires
    └── README.md
```

## Documentation
- Spécifications produit : [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md)
- Spécification klncd V1.0 : [`docs/KLNCD_V1_SPEC.md`](docs/KLNCD_V1_SPEC.md)
- Programme d'apprentissage : [`docs/CURRICULUM_SPEC.md`](docs/CURRICULUM_SPEC.md)
- Guide de contribution : [`CONTRIBUTING.md`](CONTRIBUTING.md)
- Code de conduite : [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)
- Initiateurs : [`INITIATORS.md`](INITIATORS.md)
- Contributeurs : [`CONTRIBUTORS.md`](CONTRIBUTORS.md)
