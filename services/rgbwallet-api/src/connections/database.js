/**
 * Arquivo responsável por realizar as configurações iniciais do BD
 */


 /**
  * Obtendo Cliente do Mongo DB
  */

const MongoClient = require('mongodb').MongoClient;

// Require MONGODB_URI at runtime to avoid falling back to hardcoded remote URIs
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('FATAL: MONGODB_URI is not set. Aborting.');
    process.exit(1);
}

// Determine DB name: prefer explicit MONGODB_DB, otherwise try to parse from the URI
const dbName = process.env.MONGODB_DB || (() => {
    const m = uri.match(/\/([^\/?]+)(?:\?|$)/);
    return m ? m[1] : 'RGBWallet';
})();

const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true, connectTimeoutMS: 30000 });
const ObjectId = require('mongodb').ObjectID;
client.connect()
    .then(() => console.log(`Mongo connected, using database: ${dbName}`))
    .catch(err => { console.error('Mongo connection error', err); process.exit(1); });

/**
 * Função que verifica no bd se a pessoa com tal id é admin
 */

async function verifyAdmin(id){
    if(id == 'undefined') {
        return false;
    }
    else{
        try{
            const admin = await client.db("RGBWallet").collection("Usuarios").findOne({ _id: ObjectId(id)}, {projection:{passwd: 0}});
            if(!admin){
                console.log("Nao achou nada");
    
                return false;
            }
            else if(!admin.admin){
                console.log("Nao é admin");
    
                return false;
            }
        } catch(e) {
            console.log(e)
            return false;
        }
        return true;
    }
    
}
module.exports = {client , verifyAdmin};
