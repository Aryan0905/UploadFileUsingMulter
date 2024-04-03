const path = require("path");
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const multer = require('multer');

// const upload = multer({ dest: 'uploads/' })


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    return cb(null,`${Date.now()}+${file.originalname}`);
  }
})

const upload = multer({ storage: storage });

//middleware for parser
app.use(express.json());  //it is used to parse json data
app.use(express.urlencoded({ extended: false }));  //it is used to parse url encoded data


app.get('/', (req, res) => {
  res.render('home')
});

app.post('/upload',upload.single('Resume'), (req, res) => {
    console.log(req.body);
   console.log(req.file);
   res.redirect('/');
    }
);

app.post('/photos/upload', upload.fields([{name: `Resume`,maxCount:1},{name:`CoverPhoto`,maxCount:1}]), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

  console.log(req.body);
  console.log(req.files['Resume'][0]);
  console.log(req.files['CoverPhoto'][0]);
  res.redirect('/');
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});






