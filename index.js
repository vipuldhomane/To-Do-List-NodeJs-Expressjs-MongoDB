const express = require('express');
const port = 7000;
const db = require('./config/mongoose');
const  Task  = require('./models/task');
const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});

app.post('/create-task', function(req, res){
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        
        return res.redirect('back');

    });
});
app.get('/delete-task', function(req, res){
    var id = req.query;

    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});