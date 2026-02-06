import { MongoClient } from "mongodb";

let mongo_url = "mongodb://localhost:27017" 

let database = "e-comm"

let client = new MongoClient(mongo_url)

let dbConnect = async () => {
    let connect = await client.connect()        //.connect() returns a promise
    let db = connect.db(database)
    return db.collection("loginCredentials")
}

export default dbConnect