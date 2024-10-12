const { ObjectId } = require('mongodb');

async function addimgdetails(fileNames, userid) {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
    
    try {
        await client.connect();
        console.log('Connected to the MongoDB cluster');

        const database = client.db('HandleIt');
        const collection = database.collection(userid);

        const fileData = fileNames.map(fileName => ({
            fileName: fileName,
            uploadedAt: new Date()
        }));
        const result = await collection.insertMany(fileData);
        console.log('Inserted documents:', result.insertedCount);



        return result;
    } catch (error) {
        console.error('Error inserting documents:', error);
        return 'There is a problem in saving files, please try again later or check your internet connection';
    } finally {
        await client.close();
    }
}

module.exports = addimgdetails;
