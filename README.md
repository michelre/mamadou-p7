# OpenClassrooms P7 - Réseau social d'entreprise

Il s'agit du 7eme projet diplomant d'OPENCLASSROOMS  [Développeur et intégrateur web](https://openclassrooms.com/fr/paths/594-integrateur-web)

# Scénario
Dans ce projet vous vous mettez dans la peau d'un développeur web full-stack en implémetant en meme temps le back et le front-end.

# Les différentes fonctionnalités à mettre en place

> Opération(CRUD)
- Les utilisateurs pourront se connecter
- Voir les derniers posts de tous les utilisateurs
- Publier des images
- Publier du texte
- Modifier leur profil
- Sur chaque posts, les utilisateurs pourront:
  * Liker, unliker
  * Commenter
  * Supprimer leur propre post,comment
  * voir le nombre de likes
  
# Technologies utilisées
* Backend
  * SNode.js avec le Framework Express
  * Base de Données MySQL
  * API REST
* Frontend
  * Framework React.js
  * HTML/CSS sans fromework
  
# Installations
1. Cloner ce dépot Github
```bash
      git clone https://github.com/mmbaye90/p8sql/tree/main
```
2. installer node module côté back et front
 ```bash
      cd back 
         npm i
      cd front
         npm i
```
> NB
   * Le front doit être lancé sur le port 3000

3. Parametrages de la BD:
* ajout de fichien .env avec les variables d'environnement
 ```bash
DB_HOST='localhost'
DB_BASENAME='groupomania'
DB_USER='root'
DB_PASSWORD='mot_de_passe'
SECRET_TOKEN='un_autre_mot_de_passe_pourJWT'
CLIENT_URL=http://localhost:3000
```
4. Connexion à la BD
 ```bash
     mysql -u root -p # remplacer root par votre nom d'utilisateur, puis saisir le mot de passe
```
5. Création des tablas vous trouverez le code sql des tables dans:
[code.sql](https://github.com/mmbaye90/p8sql/blob/main/back/code.sql)

# Lancez maintenant l'application
 * Côté back
     ```bash
          cd back
          npm start
     ```
 * Côté back
     ```bash
          cd front
          npm start
          # N'oubliez pas le front doit tourner sur le port 3000 en local
     ```
