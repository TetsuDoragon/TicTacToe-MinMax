var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var MinMax = require("./MinMax");



app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.send(200);

    next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/minimax/play/', function (req, res) {

	var game = req.body.game;
	var move = MinMax.getJogada(game);
	var r = {}
	if(game == undefined || move == undefined){
		r = {
		    'status': 500,
		    'msg': 'Erro'
		}
		
  		res.status(500).send(r);
	}else{
		r = {
		    'status': 200,
		    'move': move
		}
		res.status(200).send(r);
	}
	
});


app.listen(3000, function() {
  console.log('App escutando na porta 3000!');
});


////////////////////////////////////////////////////////////////////////////////////


MinMax.start();







////////////////////////////////////////////////////////////////////////////////////