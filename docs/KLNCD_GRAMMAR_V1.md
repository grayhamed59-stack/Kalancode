# Spécification Formelle : Grammaire & Pseudocode KalanCode (`klncd`) V1.0

Ce document définit formellement les règles lexicales, la grammaire EBNF et la sémantique de la bibliothèque pédagogique **`klncd` V1.0**.

---

## 1. Grammaire Formelle EBNF

```ebnf
(* Programme complet *)
Program                ::= ( Statement | NEWLINE )* EOF ;

(* Instructions autorisées *)
Statement              ::= ImportStatement
                         | AssignmentStatement
                         | ExpressionStatement ;

ImportStatement        ::= "import" IDENTIFIER ;

AssignmentStatement    ::= IDENTIFIER "=" Expression ;

ExpressionStatement    ::= Expression ;

(* Expressions et précédence des opérateurs *)
Expression             ::= AdditiveExpression ;

AdditiveExpression     ::= MultiplicativeExpression ( ( "+" | "-" ) MultiplicativeExpression )* ;

MultiplicativeExpression ::= PrimaryExpression ( ( "*" | "/" ) PrimaryExpression )* ;

PrimaryExpression      ::= NUMBER
                         | STRING
                         | FunctionCall
                         | IDENTIFIER
                         | "(" Expression ")" ;

(* Appel de fonction sous namespace *)
FunctionCall           ::= IDENTIFIER "." IDENTIFIER "(" ArgumentList? ")" ;

ArgumentList           ::= Expression ( "," Expression )* ;

(* Tokens *)
IDENTIFIER             ::= [a-zA-Z_ߐ-߿\u0190\u025B\u0186\u0254\u019D\u0272\u014A\u014B] [a-zA-Z0-9_ߐ-߿\u0190\u025B\u0186\u0254\u019D\u0272\u014A\u014B]* ;
NUMBER                 ::= [0-9]+ ( "." [0-9]+ )? ;
STRING                 ::= '"' [^"\n\r]* '"' | "'" [^'\n\r]* "'" ;
COMMENT                ::= "#" [^\n\r]* ;
```

---

## 2. Règles Lexicales

- **Sensibilité à la casse** : La syntaxe est sensible à la casse (`S3b3n` et non `s3b3n` ; `Doon` et non `doon`).
- **Noms d'identifiants** : Supportent l'alphabet ASCII standard, les caractères spéciaux du Bamanankan latin (`ɛ`, `ɔ`, `ɲ`, `ŋ`, majuscules et minuscules) ainsi que toute la plage Unicode N'Ko (`U+07C0` à `U+07FF`).
- **Chaînes de caractères** : Délimitées par des guillemets simples `'...'` ou doubles `"..."`. Les caractères Unicode sont préservés intacts sans échappement destructeur.
- **Commentaires** : Commencent par `#` et s'étendent jusqu'à la fin de la ligne. Ils sont ignorés par le Lexer.
- **Espaces blancs** : Les espaces et tabulations séparent les tokens et sont ignorés. Les sauts de ligne `\n` délimitent les instructions.

---

## 3. Règles Sémantiques et Sécurité

1. **Isolation de bibliothèque** :
   - Seul `import klncd` est accepté.
   - Tout autre import (`import os`, `import sys`, `import math`) déclenche une `SecurityError`.
2. **Fonctions officielles V1** :
   - `klncd.S3b3n(valeur)` : Affiche la valeur dans la console pédagogique.
   - `klncd.Doon(question)` : Pose la question, suspend l'exécution, attend la réponse utilisateur dans l'interface et retourne une chaîne.
3. **Opérateurs autorisés** :
   - `+` : Addition numérique (`10 + 5 = 15`) ou concaténation de chaînes (`"I ni " + "ce" = "I ni ce"`).
   - Coercition éducative : `"Solde: " + 5000` produit `"Solde: 5000"`.
   - `-`, `*`, `/` : Opérations arithmétiques standard.
   - Division par zéro : Interdite (`RuntimeError`).
4. **Variables** :
   - Lecture avant affectation interdite (`RuntimeError`).
   - Mémoire isolée par exécution (pas de fuite d'état entre deux programmes).
