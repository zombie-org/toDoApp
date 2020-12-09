var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up templete engine
app.set('view engine', 'ejs');

//fire todoController
todoController(app);

//set static file
app.use(express.static('./'))

//listen to port
app.listen(3000)
console.log('Online')
