# exercises/ — Exercices KalanCode

Ce dossier regroupe les **exercices interactifs** de KalanCode, organisés par niveau et thème.

---

## Types d'exercices

KalanCode propose différents types d'exercices pédagogiques :

| Type | Description | Exemple |
|------|-------------|---------|
| **QCM** | Choix multiple avec explication | Quel est le résultat de... ? |
| **Complétion** | Compléter du code klncd | Ajouter la condition manquante |
| **Débogage** | Trouver et corriger une erreur | Ce code a un bug, trouve-le |
| **Création** | Écrire un programme depuis zéro | Écris un algorithme qui... |
| **Simulation** | Simuler pas à pas une exécution | Suis l'algorithme du thé |

---

## Structure

`
exercises/
├── README.md           ← ce fichier
├── niveau-1/           ← débutant absolu
│   ├── algorithmes/
│   └── logique/
├── niveau-2/           ← bases acquises
│   ├── conditions/
│   └── boucles/
├── niveau-3/           ← intermédiaire
│   ├── fonctions/
│   └── structures-donnees/
└── cybersecurite/      ← exercices transversaux
    ├── phishing/
    └── mots-de-passe/
`

> **Note MVP** : Pour la phase MVP, les exercices sont intégrés dans rontend/src/data/. Ce dossier exercises/ est prévu pour les exercices **communautaires** non-codés directement dans l'app.

---

## Format d'un exercice

Chaque exercice est un fichier .json ou .md avec la structure suivante :

`json
{
  "id": "ex-001",
  "titre": "Mon premier algorithme",
  "titre_bm": "N'gana fɔlɔ aligoritimu",
  "niveau": 1,
  "type": "qcm",
  "enonce": "...",
  "enonce_bm": "...",
  "options": ["A", "B", "C", "D"],
  "reponse": "B",
  "explication": "...",
  "explication_bm": "..."
}
`

---

## Contribuer des exercices

1. Suivez le format défini ci-dessus
2. Testez l'exercice avec un apprenant débutant
3. Fournissez toujours la traduction Bamanankan
4. Ouvrez une Pull Request dans le dossier approprié

Voir : [../CONTRIBUTING.md](../CONTRIBUTING.md) — [../docs/CURRICULUM_SPEC.md](../docs/CURRICULUM_SPEC.md)
