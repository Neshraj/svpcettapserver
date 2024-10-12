const { ObjectId } = require('mongodb');

async function getpostdetails(userid) {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
    try {
        await client.connect();
        console.log('Connected to the MongoDB cluster');

        const database = client.db('HandleIt');
        const collection = database.collection(userid);

        const files = await collection.find({}).toArray();

        return files;
    } catch (error) {
        console.error('Error retrieving files:', error);
    } finally {
        await client.close();
    }
}

module.exports = getpostdetails;
