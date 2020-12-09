// var data = [{item: 'node js'}, {item: 'python'}, {item: 'matlab'}]
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://todoDemo:todoApp@red-zone.f2dog.mongodb.net/todoDemo?retryWrites=true&w=majority');

//create todo schema -our schema should be like
var todoSchema = new mongoose.Schema({
  item: String
});
//model or collection
var ToDo = mongoose.model('Todo', todoSchema);

//trail (template)data pushed
// var todoOne = ToDo({item: 'burn the world down'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved');
// });


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it on ahead to ejs(view)
    ToDo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo.ejs', {todo: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
      var newTodo = ToDo(req.body).save(function(err, data){
        if (err) throw err;
        console.log("saved item");
        res.json(data);
      });

  });

  app.delete('/todo/:item', function(req, res){
    // with db to delete item from db
    ToDo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
  //without db
  //   data = data.filter(function(todo){
  //     return todo.item.replace(/ /g,"-") !== req.params.item;
  //   });
  //   res.json(data);
  // });

};
