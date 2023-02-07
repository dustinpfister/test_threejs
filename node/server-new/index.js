#!/usr/bin/env node
//-------- ----------
// MODULES
//-------- ----------
const path = require('path'),
klaw = require('klaw'),
through2 = require('through2'),
express = require('express');
//-------- ----------
// CONST VALUES
//-------- ----------
const DIR_ROOT = path.join(__dirname, '../..');
const PORT = process.env.PORT || process.argv[2] || 8030;
//-------- ----------
// CREATE EXPRESS APP
//-------- ----------
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(DIR_ROOT, 'views') );

app.use('/', express.static( path.join(DIR_ROOT, 'views') ) );

//-------- ----------
// LISTEN
//-------- ----------
app.listen(PORT, function () {
    console.log('server_new for test_threejs site is up at port : ' + PORT);
});

