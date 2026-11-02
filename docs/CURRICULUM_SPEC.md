# Spécification Pédagogique & Architecture des Parcours KalanCode

Ce document définit l'architecture pédagogique formelle et le système de gestion de contenu de **KalanCode**, conçu pour enseigner l'informatique, l'algorithmique et la cybersécurité aux débutants au Mali et en Afrique de l'Ouest en **Bamanankan (Alphabet latin)**, **ߒߞߏ (N'Ko RTL)**, et **Français**.

---

## 1. Principes Fondamentaux de la Pédagogie KalanCode

1. **Hiérarchie Pédagogique à 7 Niveaux :**
   $$\text{Learning Path} \longrightarrow \text{Course / Level} \longrightarrow \text{Module} \longrightarrow \text{Lesson} \longrightarrow \text{Activity} \longrightarrow \text{Exercise} \longrightarrow \text{Assessment}$$
2. **Découplage strict Contenu / Code :**
   - Le contenu réside dans des fichiers structurés (`frontend/src/content/`).
   - Les traductions sont isolées dans des fichiers séparés (`locales/`) avec identifiants stables et mécanisme de repli automatique (*fallback*).
3. **Double Parcours Indépendant :**
   - **Computer Science** : Fondations algorithmiques avec `klncd` puis programmation professionnelle en **Python**.
   - **Cybersecurity** : Protection numérique, SIM Swap, phishing et hygiène mobile traités de manière autonome sans être mélangés artificiellement au code.
4. **Verrouillage et Déverrouillage Automatique :**
   - Les modules sont **verrouillés par défaut** (`🔒`).
   - L'achèvement des leçons d'un module débloque **automatiquement** le module suivant (`🔓`), avec gain d'expérience (XP) et persistance d'état.

---

## 2. Parcours Officiels

### 2.1 Parcours 1 : Computer Science (`path-computer-science`)

*Langage principal : **Python**. Le premier module utilise exclusivement le pseudocode KalanCode et la bibliothèque `klncd`.*

#### Niveau Débutant (*Beginner*)
| Ordre | Module | Moteur | Concepts Clés | Statut Initial |
|:---:|---|:---:|---|:---:|
| **1** | **Introduction to Computer Science & Algorithmic Thinking** | `klncd` | Pensée algorithmique, séquençage logique, `S3b3n()`, `Doon()` | 🔓 Déverrouillé |
| **2** | **Variables & Data Types** | `python` | Mémoire RAM, affectation `=`, types `int`, `float`, `str`, `bool` | 🔒 Verrouillé |
| **3** | **Operators & Expressions** | `python` | Opérations arithmétiques, priorités, concaténation, booléens | 🔒 Verrouillé |
| **4** | **Conditions & Decisions** | `python` | Clauses `if / elif / else`, aiguillage logique, conditions imbriquées | 🔒 Verrouillé |
| **5** | **Loops & Iterations** | `python` | Boucles `for` bornées, boucles `while`, compteurs et accumulateurs | 🔒 Verrouillé |
| **6** | **Functions & Modular Programming** | `python` | Définition `def`, passage d'arguments, `return`, portée des variables | 🔒 Verrouillé |
| **7** | **Data Structures** | `python` | Listes indexées `list`, dictionnaires `dict`, collections | 🔒 Verrouillé |

#### Niveau Intermédiaire (*Intermediate*)
| Ordre | Module | Moteur | Concepts Clés | Statut Initial |
|:---:|---|:---:|---|:---:|
| **8** | **Problem Solving & Advanced Algorithms** | `python` | Décomposition de problèmes, recherche binaire, optimisation | 🔒 Verrouillé |
| **9** | **Defensive Programming** | `python` | Gestion des exceptions (`try / except`), validation des entrées, débogage | 🔒 Verrouillé |

---

### 2.2 Parcours 2 : Cybersecurity (`path-cybersecurity`)

*Parcours totalement **indépendant**, axé sur la réalité des menaces en Afrique de l'Ouest.*

| Ordre | Module | Focus Pédagogique | Statut Initial |
|:---:|---|---|:---:|
| **1** | **Digital Hygiene & Mobile Ecosystem** | Protection SIM, attaques SIM Swap, sécurisation comptes Orange Money/Moov | 🔓 Déverrouillé |
| **2** | **Phishing & Social Engineering** | Détection faux SMS bancaires, arnaques d'ingénierie sociale et faux liens | 🔒 Verrouillé |
| **3** | **Authentication & Account Protection** | Mots de passe robustes (phrases de passe), gestionnaires et 2FA | 🔒 Verrouillé |
| **4** | **Safe Browsing & Mobile Permissions** | Audit des permissions Android abusives, chiffrement HTTPS, Wi-Fi public | 🔒 Verrouillé |

---

## 3. Règle de Verrouillage & Déblocage Automatique

- **Module 1 :** Déverrouillé par défaut pour permettre à l'apprenant de démarrer immédiatement.
- **Modules $N > 1$ :** Verrouillés (`🔒`).
- **Déverrouillage :** Dès que la dernière leçon d'un module prérequis est validée, le service de curriculum exécute :
  ```typescript
  CurriculumService.completeLesson(lessonId, progress);
  ```
  Le module suivant passe immédiatement au statut `🔓 Déverrouillé`, déclenche une notification visuelle et sonore de succès et enregistre la nouvelle progression dans `localStorage` (avec préparation à la synchronisation d'API distante FastAPI/PostgreSQL).

---

## 4. Organisation des Fichiers & Localisation

```
frontend/src/content/
├── paths/
│   ├── computer-science.json          # Structure officielle CS (9 modules)
│   └── cybersecurity.json             # Structure officielle Cyber (4 modules)
├── modules/
│   ├── cs-01-intro-algo.json          # Module 1 (klncd)
│   ├── cs-02-variables.json           # Module 2 (Python)
│   └── ...
├── lessons/
│   ├── cs-01-01-tea-algorithm.json    # Séquençage du thé
│   ├── cs-01-02-klncd-output-s3b3n.json # Sortie S3b3n()
│   ├── cs-01-03-klncd-input-doon.json   # Entrée Doon()
│   └── ...
└── locales/
    ├── bamanankan-latin/curriculum.json # Traductions en Bamanankan Latin
    ├── nko/curriculum.json              # Traductions en N'Ko (RTL)
    └── french/curriculum.json           # Traductions en Français
```

- **Moteur de Fallback :**
  $$\text{Rendu} = \text{Langue sélectionnée} \;\to\; \text{Bamanankan Latin} \;\to\; \text{Français} \;\to\; \text{Clé}$$
- Les textes manquants ne bloquent jamais la leçon.
- Le sens d'écriture est automatiquement commuté en `dir="rtl"` pour le N'Ko, tandis que les blocs de code restent toujours en `dir="ltr"` monospace.
