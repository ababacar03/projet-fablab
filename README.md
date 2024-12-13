Gestion de Stock des Matériels de Laboratoire

Ce projet est une application web conçue pour gérer les matériels du laboratoire de notre école. Il permet de suivre l'inventaire des équipements, d'ajouter de nouveaux matériels, de mettre à jour leurs informations et de supprimer ceux qui ne sont plus disponibles.

L'application est développée avec React.js pour le front-end et MongoDB pour le back-end.
📋 Fonctionnalités

    Affichage des matériels : Liste complète des équipements disponibles.
    Ajout d'un matériel : Ajout d’un nouvel équipement avec ses informations (nom, quantité, catégorie, etc.).
    Mise à jour des matériels : Modification des détails existants.
    Suppression d'un matériel : Retrait des matériels obsolètes ou endommagés.
    Recherche : Recherche par nom ou catégorie.

🚀 Installation et Configuration
1. Prérequis

    Node.js installé sur votre machine.
    MongoDB installé et en cours d'exécution.

2. Clonage du Projet

Clonez ce dépôt sur votre machine locale :

git clone https://github.com/votre-utilisateur/gestion-stock-labo.git  
cd gestion-stock-labo  

3. Démarrage du Backend
Installation des dépendances :

cd backend  
npm install  

Démarrage du serveur :

Assurez-vous que votre instance MongoDB est active, puis lancez :

npm start  

Le serveur back-end sera accessible sur http://localhost:5000.
4. Démarrage du Frontend
Installation des dépendances :

cd ../frontend  
npm install  

Démarrage de l'application React :

npm start  

L'application front-end sera accessible sur http://localhost:3000.
🛠️ Technologies Utilisées

    Frontend : React.js, Axios
    Backend : Node.js, Express.js
    Base de données : MongoDB

🧪 Tests
Backend

Pour tester les API :

    Utilisez un outil comme Postman ou curl.
    Les routes sont disponibles dans backend/routes/materials.js.

Frontend

    Vérifiez le bon fonctionnement des composants via l'interface utilisateur.
    Exécutez des tests unitaires avec :

npm test  

📚 Documentation des API
Routes principales :
Méthode	Endpoint	Description
GET	/api/materials	Récupérer tous les matériels
POST	/api/materials	Ajouter un nouveau matériel
PUT	/api/materials/:id	Mettre à jour un matériel
DELETE	/api/materials/:id	Supprimer un matériel
✨ Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce projet :

    Forkez le dépôt.
    Créez une branche pour votre fonctionnalité (git checkout -b feature-nouvelle-fonctionnalite).
    Commitez vos modifications (git commit -m 'Ajout de la nouvelle fonctionnalité').
    Poussez sur la branche (git push origin feature-nouvelle-fonctionnalite).
    Créez une Pull Request.
