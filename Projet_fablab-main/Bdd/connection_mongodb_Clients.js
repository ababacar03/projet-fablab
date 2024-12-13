const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://romainpietri:4vZ82ApZxpsG4mwz@projectfablab.n96bi5x.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);

const dbName = "Fablab";
const collectionName_Client= "Client";

async function pingToBDD() {
    const start = Date.now();

  try {
    
    await client.connect();

    await client.db(dbName).command({ ping: 1 });


    const end = Date.now();
    const delay = end - start;
    
    console.log("\x1b[33m%s\x1b[0m",`Ping réussi ! Delay : ${delay} ms  \u26A0\uFE0F`);
  } catch (error) {
    console.error('Erreur lors du ping de la base de données :', error);
  }
}




async function getAllFromClient_(username) {
    try {
        // Connecte le client au serveur (facultatif à partir de la v4.7)
        
        await client.connect();
        
        
        const database = client.db(dbName);
        const collection = database.collection(collectionName_Client);
        
        // Recherche le document correspondant à l'utilisateur
        const query = { username: username };
        const options = {};
        
        // Convertit le curseur en tableau
        const documents = await collection.find(query, options).toArray();
        
        // Si aucun document trouvé, renvoie false
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        
        // Renvoie le premier document trouvé
        const userDocument = documents[0];
        //console.log(userDocument);
        return userDocument;
    } catch (error) {
        console.log("Erreur :", error);
        // Vous pouvez rejeter l'erreur si nécessaire
        throw error;
    }
}

function getAllFromClient(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAllFromClient_(username));
        }, 1000);
    });
}
async function verifyPassword_(username, password){
    
    
    try{
        
        const userDocument = await getAllFromClient(username);
        
        if(userDocument){
            if(userDocument.mdp === password){
                console.log("Connection réussie");
                return true;
            }
            else{
                console.log("Mauvais mot de passe");
                return false;
            }
        }
        else{
            console.log("Utilisateur non trouvé");
            return false;
        }
    
    }
    catch{
        console.log("Error");
    }
}
function verifyPassword(username,password){

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve(verifyPassword_(username,password));
        }, 1000);
    });
}
async function verifySolo(username){
    try{
        await client.connect();
        //recupere tout les client
        const allClient = await getAllClient();
        //console.log(allClient);
        //verifie si le client est dans la liste
        for(let i = 0; i < allClient.length; i++){
            if(allClient[i].username === username){
                return false;
            }
        }
        return true;
    }
    catch(e){
        console.log("Error verify solo");
    
    }
    finally{
        

    }       

}


async function createClient(Client) {
    try {
        if(await verifySolo(Client.username)){
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection(collectionName_Client);
            await collection.insertOne(Client);
            console.log("Client ajouté avec succès");
            return true;
        }
        else{
            console.log("Client déjà existant");
            return false;
        }
    } catch (e) {
        console.log(e);
        console.log("Error create client");
        return false;
    } 
    finally {
        

    }
}

async function modifClient(username, Client){
    //modifie un client dans la collection
    try{
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName_Client)
        const query = {username: username};
        const options = {$set: Client};
        const cursor = collection.find(query, options);
        //trouve le client a modifier
        const result = await collection.updateOne(query, options);
        console.log("Client modifié avec succès");
        return true
        
    }
    catch{
        console.log("Error modif client");
        return false;
    }
    finally{
        

    }
}
async function deleteClient(username) {
    try {
        await client.connect();
        //ping le serveur
        await client.db(dbName).command({ ping: 1 });
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName_Client);
        const query = { username: username };
        const options = {};
        
        // Supprime directement le client correspondant à la requête
        const result = await collection.deleteOne(query, options);

        if (result.deletedCount === 1) {
            console.log("Client supprimé avec succès");
            return true;
        } else {
            console.log("Aucun client trouvé pour la suppression");
            return false;
        }
    } catch (e) {
        console.log("Error delete Client", e);
        return false;
    } 
}


async function getAllClient(){
    //recupere tous les clients dans la collection
    try{
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName_Client)
        const query = {};
        const options = {};
        const cursor = collection.find(query, options);
        //trouve le client a supprimer
        const result = await collection.find(query, options).toArray();
        console.log("Tout les client ont été récupéré avec succès");
        //met tous les client.mdp a null
        for(let i = 0; i < result.length; i++){
            result[i].mdp = null;
        }      

        return result;
    }
    catch{
        console.log("Error Get ALL Client");
    }
}





//export des fonctions
exports.verifyPassword = verifyPassword;
exports.createClient = createClient;
exports.modifClient = modifClient;
exports.getAllFromClient = getAllFromClient;
exports.deleteClient = deleteClient;
exports.getAllClient = getAllClient;
exports.verifySolo = verifySolo;
exports.pingToBDD = pingToBDD;