async function createaccount(data){
    let data1={'nffiles':0};

    delete data.sotp;
      const { MongoClient } = require('mongodb');
      const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
          try {
            // Connect to the MongoDB cluster
            await client.connect();
            let {rollnumber} = data;
            let {filename} = data;
            console.log('Connected to the MongoDB cluster');
            const database = client.db('svpcettap');
            const collection = database.collection(rollnumber);
            const query = { filename: filename };

            const chresult = await collection.findOne(query); 
            
            console.log(chresult);
            return chresult;

          } catch (error) {
              // Handle connection errors
              return 'There is a problem in opening files please try again later or check your internet connection';
              
            } finally {
            // Close the connection when you're done
            await client.close();
          }
          
  
      }
      //console.log('data in create function ',data);
      
  
  
  module.exports = createaccount;