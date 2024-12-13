# Projet_fablab
oui
ouioui
non


| Fetch                    | Données demandées                                      | Données renvoyées                                 | Qu'est-ce que ça fait                               |
|--------------------------|---------------------------------------------------------|---------------------------------------------------|------------------------------------------------------|
| `/login`                 | `{ username: '', mdp: '' }`                            | Status 200 si authentifié, sinon Status 401        | Authentification de l'utilisateur                      |
| `/createAccompt`         | `{ /* Données nécessaires pour créer un compte */ }`     | Status 200 si succès, sinon Status 401 ou 402     | Création d'un nouveau compte                           |
| `/deleteAccompt`         | `{ username: '' }`                                      | Status 200 si succès, sinon Status 401             | Suppression d'un compte utilisateur                     |
| `/modifAccompt`          | `{ username: '', /* autres données de modification */ }` | Status 200 si succès, sinon Status 401        | Modification des informations d'un compte utilisateur   |
| `/getAllClient`          | `{}`                                                    | Données de tous les clients ou Status 401         | Récupération des données de tous les clients             |
| `/getAllFromClient`      | `{ username: '' }`                                      | Données spécifiques du client ou Status 401        | Récupération des données spécifiques d'un client        |
| `/getAllStock`           | `{}`                                                    | Données de tout le stock ou Status 401            | Récupération des données de tout le stock               |
| `/getOneStock`           | `{ id: '' }`                                            | Données spécifiques du stock ou Status 401        | Récupération des données spécifiques d'un élément du stock |
| `/createStock`           | `{ /* Données nécessaires pour créer un élément du stock */ }` | Status 200 si succès, sinon Status 401 ou 402 | Création d'un nouvel élément du stock                   |
| `/deleteStock`           | `{ id: '' }`                                            | Status 200 si succès, sinon Status 401            | Suppression d'un élément du stock                        |
| `/modifStock`            | `{ id: '', /* autres données de modification */ }`     | Status 200 si succès, sinon Status 401 | Modification des informations d'un élément du stock      |
| `/getAllReservation`     | `{}`                                                    | Données de toutes les réservations ou Status 401 | Récupération des données de toutes les réservations      |
| `/getOneReservation`     | `{ id: '' }`                                            | Données spécifiques de la réservation ou Status 401 | Récupération des données spécifiques d'une réservation    |
| `/createReservation`     | `{ /* Données nécessaires pour créer une réservation */ }` | Status 200 si succès, sinon Status 401 ou 402 | Création d'une nouvelle réservation                      |
| `/deleteReservation`     | `{ id: '' }`                                            | Status 200 si succès, sinon Status 401            | Suppression d'une réservation                            |
| `/modifReservation`      | `{ id: '', /* autres données de modification */ }`     | Status 200 si succès, sinon Status 401 | Modification des informations d'une réservation          |
