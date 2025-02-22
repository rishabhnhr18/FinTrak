"use strict";

var dotenv = require('dotenv').config();

var path = require('path');

var express = require('express');

var colors = require('colors');

var cors = require('cors');

var connectDB = require('./config/db');

var _require = require('./middleware/errorHandler'),
    errorHandler = _require.errorHandler;

var fileUpload = require('express-fileupload');

connectDB();
var app = express();
app.use(cors());
app.options('*', cors()); // Enable CORS

app.use(fileUpload({
  useTempFiles: true
}));
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));
var PORT = process.env.PORT || 8080;
app.use(errorHandler);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/', require('./routes/transactionRoutes'));
app.use('/api/', require('./routes/requestRoutes'));
app.use('/api/', require('./routes/uploadRoutes'));
app.get('/', function (req, res) {
  res.send('api is running...');
});
app.listen(PORT, function () {
  return console.log("Server Running on Port: http://localhost:".concat(PORT, " at ").concat(new Date().toLocaleString('en-US')).bgCyan.bold.underline);
});
//# sourceMappingURL=index.dev.js.map
