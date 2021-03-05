const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const logger = require('morgan');
const upload = multer({dest: 'resourse/'});
const API_PORT = 3001;
const app = express();

app.use(cors());
const router = express.Router();


// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/resources', express.static(__dirname + '/resources'));
// this is our get method
// this method fetches all available data in our database
router.post('/upload', upload.any(), (req, res) => {
  const des_file = "./resourse/" + req.files[0].originalname;

  return res.json({ success: true, data: {filename: des_file } });
});


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));