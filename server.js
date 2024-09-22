const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const createaccount = require('./functons/createaccount');
const savefiles = require('./functons/savefiles');
const getfilesdetals = require('./functons/getfilesdetals');
const getfile = require('./functons/getfile');
const deletefile = require('./functons/deletefile');
const updatepass = require('./functons/updatepass');


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/instaclone')));


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


//To save files
app.post('/savefile', (req, res) => {
    async function save(){
      const receivedData = req.body;
        let crres = await savefiles(receivedData);
        if(crres){
          res.json({ message: crres});
        }
    }
    save();
  });


//To get getfilesdetals
app.post('/getfilesdetals', (req, res) => {
    async function gafd(){
      const receivedData = req.body;
        let crres = await getfilesdetals(receivedData);
        if(crres){
          res.json({ message: crres});
        }
    }
    gafd();
  });

//To get file
app.post('/getfile', (req, res) => {
    async function gfl(){
      const receivedData = req.body;
        let crres = await getfile(receivedData);
        if(crres){
          res.json({ message: crres});
        }
    }
    gfl();
  });


//To delete file
app.post('/deletefile', (req, res) => {
    async function delfl(){
      const receivedData = req.body;
        let crres = await deletefile(receivedData);
        if(crres){
          res.json({ message: crres});
        }
    }
    delfl();
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





app.listen(port, () => {
  console.log(`Server is running at http://:${port}`);
});