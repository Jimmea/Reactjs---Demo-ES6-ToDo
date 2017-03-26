var express    = require("express");
var bodyParser = require('body-parser');
var parser     = bodyParser.urlencoded({extended:false});
var router     = express.Router();

var mang =  ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5'];

router.get('/', function (req, res)
{
   res.render('home');
});

router.post('/getTodo', function (req, res)
{
    res.send(mang);
});

router.post('/addTodo', parser, function (req, res)
{
    var newDay = req.body.day;
    mang.unshift(newDay);
    res.send(mang);
});

router.post('/updateTodo', parser, function (req, res)
{
    var id      = req.body.id;
    mang[id]    = req.body.value;
    res.send(mang);
});

router.post('/deleteTodo', parser, function (req, res)
{
    var id = req.body.id;
    mang.splice(id, 1);
    res.send(mang);
});

module.exports = router;