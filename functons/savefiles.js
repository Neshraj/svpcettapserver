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
            let {filedata} = data;
            let sdata = {
                'filename' : filename,
                'filedata' : filedata
            };
            console.log('Connected to the MongoDB cluster');
            const database = client.db('svpcettap');
            const collection = database.collection(rollnumber);
            const query = { filename: filename };

            const chresult = await collection.findOne(query);

            if(chresult){
                const updateResult = await collection.updateOne(query, {
                    $set: { filedata: filedata }
                });

                if(updateResult){
                    return 'File updated';
                }
              
            }

            else{
                const result = await collection.insertOne(sdata);
                return 'File saved';
            }

          } catch (error) {
              // Handle connection errors
              return 'There is a problem in saving files please try again later or check your internet connection';
              
            } finally {
            // Close the connection when you're done
            await client.close();
          }
          
  
      }
      //console.log('data in create function ',data);
      
  
  
  module.exports = createaccount;