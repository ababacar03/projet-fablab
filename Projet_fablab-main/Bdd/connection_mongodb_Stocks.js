const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://romainpietri:4vZ82ApZxpsG4mwz@projectfablab.n96bi5x.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
const dbName = "Fablab";
const collectionName = "Stocks";

async function createID_(type){
    var id = 0;
    switch(type){
        case "consommable": id=2000;
        break;
        case "machine": id=1000;
        break;
        case "empruntable" : id = 3000;
        break;
    }
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { type: type };
        const options = {};
        const documents = await collection.find(query, options).toArray();
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return id;
        }
        else{
            var max = 0;
            documents.forEach(element => {
                //prend element.id en int
                var id = parseInt(element.id);
                if(id>max){
                    max = id;
                }

            });
            return String(max+1);
        }
    }
    catch(error){
        console.log("Erreur :", error);
        return false;
    }
}
function createID(type){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(createID_(type));
        }, 1000);
    }
    );
}
async function getAllStocks_() {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = {};
        const options = {};
        const documents = await collection.find(query, options).toArray();
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        return documents;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function getAllStock(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAllStocks_());
        }, 1000);
    });
}

async function getOneStock_(id) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { id: id };
        const options = {};
        const documents = await collection.find(query, options).toArray();
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        return documents;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function getOneStock(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getOneStock_(id));
        }, 1000);
    });
}

async function createStock_(stock) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(stock);
        console.log(`Un nouveau stock a été inséré avec l'ID ${result.insertedId}`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function createStock(stock){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(createStock_(stock));
        }, 1000);
    });
}

async function deleteStock_(id) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.deleteOne({ id: id });
        console.log(`${result.deletedCount} document(s) a/ont été supprimé(s)`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function deleteStock(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(deleteStock_(id));
        }, 1000);
    });
}

async function modifStock_(id, stock) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.replaceOne({ id: id }, stock);
        console.log(`${result.modifiedCount} document(s) a/ont été modifié(s)`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function modifStock(id, stock){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(modifStock_(id, stock));
        }, 1000);
    });
}

async function getAllFromStock_(id) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = { id: id };
        const options = {};
        const documents = await collection.find(query, options).toArray();
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        return documents;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

function getAllFromStock(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAllFromStock_(id));
        }, 1000);
    });
}

async function modifyNumberStock_(id, number) {
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne({ id: id }, { $inc: { "quantite": number } });
        console.log(`${result.modifiedCount} document(s) a/ont été modifié(s)`);
        return result;
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}
function modifyNumberStock(id, number){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(modifyNumberStock_(id, number));
        }, 1000);
    });
}

async function reduceQuantity(id, number){
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        //fait la query 
        const query = { id: id };
        const options = {};
        //trouve le document
        const documents = await collection.find(query, options).toArray();
        //si le document n'existe pas
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        //si le document existe
        else{
            //prend le document
            var doc = documents[0];
            //prend la quantité
            var quantite = doc.quantite;
            //si la quantité est suffisante
            if(quantite>=parseInt(number)){
                //modifie la quantité dans la base de données
                var newquantity = parseInt(quantite)-parseInt(number);
                console.log(newquantity)
                var result = await collection.updateOne({id: id}, {$set: {"quantite": newquantity}});
                console.log(`${result.modifiedCount} document(s) a/ont été modifié(s)`);
                return result;
            }
            //si la quantité n'est pas suffisante
            else{
                console.log("Quantité insuffisante");
                return false;
            }
        }
        
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

async function augmenteQuantity(id, number){
    try{
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        //fait la query 
        const query = { id: id };
        const options = {};
        //trouve le document
        const documents = await collection.find(query, options).toArray();
        //si le document n'existe pas
        if (documents.length === 0) {
            console.log("Aucun document trouvé!");
            return false;
        }
        //si le document existe
        else{
            //prend le document
            var doc = documents[0];
            //prend la quantité
            var quantite = doc.quantite;
            //modifie la quantité dans la base de données
            var newquantity = parseInt(quantite)+parseInt(number);
            console.log(newquantity)
            var result = await collection.updateOne({id: id}, {$set: {"quantite": newquantity}});
            console.log(`${result.modifiedCount} document(s) a/ont été modifié(s)`);
            return result;
        }
        
    }
    catch(error){
        console.log("Erreur :", error);
        throw error;
    }
}

module.exports = {getAllStock, getOneStock, createStock, deleteStock, modifStock, getAllFromStock, modifyNumberStock, createID,reduceQuantity, augmenteQuantity};