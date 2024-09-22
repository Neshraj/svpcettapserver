async function createaccount(data){
    let data1={'nffiles':0};

    delete data.sotp;
      const { MongoClient } = require('mongodb');
      const client = new MongoClient('mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority');
          try {
            // Connect to the MongoDB cluster
            await client.connect();
            let {rollnumber} = data;
            let {password} = data;
            console.log('Connected to the MongoDB cluster');
            const database = client.db('svpcettap');
            const collection = database.collection('allstudents');
            const collection1 = database.collection(rollnumber);
            const query1 = { rollnumber: rollnumber };
            const chresult1 = await collection.findOne(query1);
            if(chresult1){
                if(chresult1.password===password){
                    return 'Logged in successfully';
                }
                else{
                    return 'Incorrect password';
                }
                
                
            }

            else{
                const result = await collection.insertOne(data);
                const result1 = await collection1.insertOne(data1);
                return 'Logged in successfully';
            }

          } catch (error) {
              // Handle connection errors
              return 'There is a problem in login please try again later or check your internet connection';
              
            } finally {
            // Close the connection when you're done
            await client.close();
          }
          
  
      }
      //console.log('data in create function ',data);
      
  
  
  module.exports = createaccount;