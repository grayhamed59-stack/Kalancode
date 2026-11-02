# Product Specification — KalanCode

- **Version :** 0.1
- **Statut :** brouillon initial à valider avec la communauté
- **Type :** projet éducatif open source
- **Nom :** KalanCode (nom de travail, à vérifier)

## 1. Vision
Rendre l'apprentissage de l'algorithmique, de la programmation et des bases de la cybersécurité plus accessible aux jeunes débutants au Mali grâce à des explications en Bamanankan, disponibles en alphabet latin et en écriture N'Ko.

## 2. Public cible
Jeunes débutants sans expérience préalable en programmation. Les enseignants, mentors, locuteurs du Bamanankan, lecteurs du N'Ko et contributeurs techniques constituent des utilisateurs et partenaires secondaires.

## 3. Problème à résoudre
Les débutants peuvent rencontrer des obstacles linguistiques, manquer d'exercices pratiques et avoir peu de ressources pédagogiques localisées, validées et accessibles avec une connexion limitée.

## 4. Principes produit
- Débutant d'abord : aucune expérience de programmation requise.
- Langue et écriture conçues dès le départ.
- Apprentissage par la pratique et exemples proches du quotidien.
- Compatibilité mobile et ordinateur.
- Accès aux leçons avec une connexion limitée, lorsque possible.
- Contenus validés par des personnes compétentes en langue, pédagogie et technique.
- Protection des données et cybersécurité dès la conception.
- Code et contenus sous des licences clairement définies.

## 5. Périmètre du MVP
### Inclus
1. Choisir Bamanankan latin ou N'Ko.
2. Consulter des leçons courtes.
3. Faire des exercices d'algorithme sans exécuter de code arbitraire.
4. Bibliothèque officielle et interpréteur sandboxé `klncd` V1.0 (`S3b3n`, `Doon`, console interactive).
5. Recevoir un retour pédagogique.
6. Voir une progression simple.
7. Lire les contenus sur téléphone et ordinateur.
8. Contribuer aux contenus via un processus public de revue.

### Hors périmètre initial
- Applications mobiles natives.
- Tuteur IA.
- Réseau social ou messagerie.
- Paiements et abonnements.
- Plateforme complète de gestion scolaire.
- Exécution de code Python en production tant qu'un environnement isolé et audité n'est pas prêt.

## 6. Parcours d'apprentissage initial
1. Penser comme un programmeur.
2. Séquence et algorithmes.
3. Variables et données.
4. Conditions.
5. Boucles.
6. Fonctions.
7. Premiers programmes Python.
8. Sécurité numérique et hameçonnage.
9. Authentification, permissions et protection des comptes.
10. Projet pratique final.

## 7. Exigences linguistiques et d'écriture
- Les contenus partagent un identifiant stable entre variantes.
- Les traductions ne créent pas des parcours de progression séparés.
- Les termes techniques sont expliqués; ils ne sont pas traduits mécaniquement.
- Le texte N'Ko, le texte latin et le code doivent pouvoir coexister sans erreurs de direction.
- Les contenus publiés passent une revue linguistique, pédagogique et technique.
- Le nom, les codes de langue et les conventions de script seront vérifiés avec des spécialistes.

## 8. Exigences techniques initiales
- Interface web responsive.
- Architecture de contenu séparée de l'interface.
- API backend si nécessaire pour les comptes et la progression partagée.
- PostgreSQL lorsque la persistance serveur est justifiée.
- Cache de leçons pour les connexions limitées.
- Tests automatiques pour les contenus, l'affichage et la progression.
- Aucun code apprenant exécuté dans le processus principal de l'API.

## 9. Validation
Pilote avec 10 à 20 débutants, si possible avec des préférences d'écriture variées.
Mesurer :
- progression entre une évaluation initiale et finale;
- capacité à résoudre un problème nouveau;
- taux d'achèvement et points d'abandon;
- compréhension et naturel des explications;
- défauts d'affichage N'Ko/latin;
- fonctionnement sur téléphone et connexion faible.

Les résultats du petit pilote seront exploratoires et ne prouveront pas l'efficacité pour tous les apprenants.

## 10. Critères de réussite du premier prototype
- Un apprenant peut sélectionner une variante d'écriture.
- Il peut ouvrir une leçon et terminer un exercice.
- Les deux variantes partagent le même objectif et le même identifiant de leçon.
- L'affichage est utilisable sur téléphone et ordinateur.
- Les contenus pilotes sont relus par des personnes compétentes.
- Aucun défaut critique connu n'est laissé sans traitement.

## 11. Questions ouvertes
- Quel nom définitif adopter après vérification?
- Quelles personnes vont relire le Bamanankan et le N'Ko?
- Quel modèle de licence convient au code et aux contenus?
- Quels appareils et navigateurs sont utilisés par les premiers apprenants?
- Quel niveau de fonctionnement hors ligne est nécessaire au pilote?

## 12. Prochaine étape
Créer le dépôt Git, valider le README et cette spécification, puis définir les premiers contenus et le prototype d'une leçon.
