const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 4000;
const cors = require('cors');
const createaccount = require('./functons/createaccount');
const addimgdetails = require('./functons/addimgdetails');
const getpostdetails = require('./functons/getpostdetails');
const updatepass = require('./functons/updatepass');
const deleteposts = require('./functons/deleteposts');
const createadminaccount = require('./functons/createadminlogin');
const getalluserdetails = require('./functons/getalluserdetails');
const updateadmindetails = require('./functons/updateadmindetails');

app.use(express.json());
app.use(cors());
app.use('./uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
app.post('/uploadimages', upload.array('images', 10), (req, res) => {
  try {
      const { name, socialMediaHandle,userid } = req.body;
      const files = req.files;
      const fileNames = files.map(file => file.filename);
      addimgdetails(fileNames,userid);
      console.log('Uploaded File Names:', fileNames);

      res.status(200).json({
          message: 'Images uploaded successfully!',
          fileInfo: files,
      });
  } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ error: 'Error uploading images' });
  }
});
app.get('/getposts', async (req, res) => {
  const { userid } = req.query;
  
  try {
    const crres = await getpostdetails(userid);
    
    if (crres) {
      res.json({ files: crres });
    } else {
      res.status(404).json({ message: 'No posts found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

//functionds ends hear

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
  });


app.get('/', (req, res) => {
  res.json({ message: 'ok!' });
});



//To create account
app.post('/createaccount', (req, res) => {
    async function create(){
      const receivedData = req.body;
        let crres = await createaccount(receivedData);
        if(crres){
          res.json({ message: crres});
        }
    }
    create();
  });

//To create admin account
app.post('/createadminaccount', (req, res) => {
    async function create(){
      const receivedData = req.body;
        let crres = await createadminaccount(receivedData);
        if(crres){
          res.json({ message: crres});
        }
    }
    create();
  });



app.get('/getimage/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads', filename);


  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.sendFile(filepath);
  });
});


//To updatepassword
app.post('/updatepassword', (req, res) => {
  async function uppass(){
    const receivedData = req.body;
      let crres = await updatepass(receivedData);
      if(crres){
        res.json({ message: crres});
      }
  }
  uppass();
});

//To update admin details
app.post('/updateadmindetails', (req, res) => {
  async function uppass(){
    const receivedData = req.body;
      let crres = await updateadmindetails(receivedData);
      if(crres){
        res.json({ message: crres});
      }
  }
  uppass();
});


//Get user data
app.get('/getalluserdata', async (req, res) => {
  try {
    const crres = await getalluserdetails();
    
    if (crres) {
      res.json({ files: crres });
    } else {
      res.status(404).json({ message: 'No Data found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});



app.delete('/deletepost', async (req, res) => {
  const { fileName, userid } = req.body;
  console.log(fileName,userid);
  
  const filePath = path.join(__dirname, 'uploads', fileName);

  try {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'File not found' });
      }
      fs.unlink(filePath, async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error deleting file' });
        }

        console.log(`File ${fileName} deleted successfully`);
        res.status(200).json({ message: 'File deleted successfully' });
        deleteposts(fileName,userid);


      });
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Error deleting file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://:${port}`);
});