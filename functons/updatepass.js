async function Updatedata(data) {
    delete data.sotp;
    const { MongoClient } = require('mongodb');

    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        let { rollnumber, newpass } = data;
        
        const database = client.db('svpcettap');
        const collection = database.collection('allstudents');

        // Find the document with the given roll number
        const filter = { rollnumber: rollnumber };
        const update = { $set: { password: newpass } };

        const result = await collection.updateOne(filter, update);
        if (result.modifiedCount === 1) {
            return 'Password changed successfully';
        } else {
            return 'No changes made';
        }

    } catch (error) {
        return 'There is some problem in updating data or check your internet connection and try again';
    } finally {
        await client.close();
    }
}

module.exports = Updatedata;
