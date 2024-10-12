async function createaccount(data){
    let data1={'nffiles':0};

    delete data.sotp;
      const { MongoClient } = require('mongodb');
      const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
          try {
            // Connect to the MongoDB cluster
            await client.connect();
            let {rollnumber} = data;

            console.log('Connected to the MongoDB cluster');
            const database = client.db('svpcettap');
            const collection = database.collection(rollnumber);
            
            const result = await collection.find({ filename: { $exists: true } }).project({ filename: 1, _id: 0 }).toArray();

            const filenames = result.map(doc => doc.filename);
            
            const count = filenames.length;

            console.log('Filenames:', filenames);
            console.log('Number of filenames:', count);

            if(result){
                let sallfdet = {
                    'filenames' : filenames,
                    'filecount' : count
                };

                return sallfdet;
              
            }


          } catch (error) {
              // Handle connection errors
              return 'There is a problem in getting files details please try again later or check your internet connection';
              
            } finally {
            // Close the connection when you're done
            await client.close();
          }
          
  
      }
      //console.log('data in create function ',data);
      
  
  
  module.exports = createaccount;