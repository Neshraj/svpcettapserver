async function createadminaccount(){
      const { MongoClient } = require('mongodb');
      const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');

      try {
        await client.connect();
        const db = client.db('HandleIt');
        const usersCollection = db.collection('AllUserDetails');
        const users = await usersCollection.find().toArray();
        
        const userDetails = [];
        for (const user of users) {
          const username = user.rollnumber;
          const socialMediaHandle = user.smhdl;
          const userFilesCollection = db.collection(username); 
          const files = await userFilesCollection.find().toArray();
          const alldata = files.map(file => file.fileName);
          const numofdata = alldata.length;
    
          userDetails.push({
            username,
            socialMediaHandle,
            alldata,
            numofdata,
          });
        }
    
        console.log(userDetails);
        
        return userDetails;
      } catch (error) {
        console.error('Error fetching user details:', error);
        return 'Error fetching user details.';
      } finally {
        await client.close();
      }
    
          
  
      }
      
  module.exports = createadminaccount;