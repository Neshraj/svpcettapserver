const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';

async function deleteposts(fileName,userid) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('HandleIt');
    const collection = db.collection(userid);
    const result = await collection.deleteOne({ fileName: fileName });

    if (result.deletedCount > 0) {
      console.log(`File ${fileName} deleted successfully.`);
      return { success: true, message: `File ${fileName} deleted successfully.` };
    } else {
      console.log(`File ${fileName} not found.`);
      return { success: false, message: 'File not found or already deleted.' };
    }
  } catch (error) {
    console.error('Error deleting file from database:', error);
    return { success: false, message: 'Error deleting file from database.' };
  } finally {
    await client.close();
  }
}

module.exports = deleteposts;
