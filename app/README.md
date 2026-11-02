# app/ — Application KalanCode

Ce dossier est le **point d'entrée documentaire** vers le code de l'application KalanCode.

Le code source de l'application se trouve dans [../frontend/](../frontend/) à la racine du projet.

## Structure de l'application

`
frontend/
├── src/
│   ├── components/     # Composants React (UI, vues, navigation)
│   ├── data/           # Données curriculaires et leçons
│   ├── services/       # Services (curriculum, progression)
│   ├── klncd/          # Interpréteur du langage klncd
│   ├── types/          # Types TypeScript
│   └── utils/          # Utilitaires
├── public/
├── index.html
├── package.json
└── vite.config.ts
`

## Démarrage rapide

`ash
cd ../frontend
npm install
npm run dev
`

L'application démarre sur http://127.0.0.1:5173/

## Stack technique

- **React 18** + **TypeScript** + **Vite**
- CSS natif (pas de framework CSS)
- Interpréteur klncd custom (sans eval())
- Tests avec Vitest

## Documentation

- Spécifications produit : [../docs/PRODUCT_SPEC.md](../docs/PRODUCT_SPEC.md)
- Grammaire klncd : [../docs/KLNCD_GRAMMAR_V1.md](../docs/KLNCD_GRAMMAR_V1.md)
- Spécification klncd : [../docs/KLNCD_V1_SPEC.md](../docs/KLNCD_V1_SPEC.md)

> Ce dossier pp/ est un point d'accès documentaire. Le code source réel est dans rontend/.
