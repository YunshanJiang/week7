let express = require('express');
let app = express();

//parse JSON
app.use(express.json());


//db
let dataStore = require('nedb');
let db = new dataStore('week7.db');
db.loadDatabase();
app.use('/', express.static('public'));

app.post('/postStudentINFO', (req, res)=>{
   
    db.insert(req.body,(err, newDocs)=>{
        if(err) {
            res.json({task: "task failed"});
        } else {
            res.json({task:"success"});
        }

    })

});

app.get('/getStudentINFO', (req, res)=>{
    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }

    })

});

let port = process.env.PORT || 3000;
app.listen(port, ()=> {
console.log('listening at ', port);
});
