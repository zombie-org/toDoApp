var express = require('express');
var todoController = require('./controllers/todoController.js');

var app = express();

//set up templete engine
app.set('view engine', 'ejs');

//fire todoController
todoController(app);

//set static file
app.use(express.static('./'))

//listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
