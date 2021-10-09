const express = require('express');
const exphbs  = require('express-handlebars');
let bodyParser = require('body-parser');
let PizzaCart = require('./js/functions')
const shoppingCart = PizzaCart();

//let jsdom = require('jsdom');
//let JSDOM = require('JSDOM')
//const jsdom = require('jsdom');

// const dom = JSDOM('./js/dom')
// const { JSDOM } = require("jsdom");

//const dom = new JSDOM(html)


const app = express();


// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');


// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

let counter = 0;

app.get('/', function(req, res){
	let totals = shoppingCart.getTotals();
	let quantities = shoppingCart.getQuantities();
	let hiddenBtn = shoppingCart.getHiddenBtn();
	//let checkout = shoppingCart.checkoutBtn();
	//let orderingPizza = shoppingCart.orderPizza();
	
	
	
		res.render('index', {
			totals,
			quantities,
			hiddenBtn,
			//  checkout  
			//orderingPizza
		})
	
	});

	app.get('/cart', function(req, res){
		shoppingCart.checkOutClick();
		//shoppingCart.payment(); 
		res.render('/')
	});
	
	app.get('/remove-small', function(req, res){
		shoppingCart.removeSmall();
	
	res.redirect('/')
	});
	
	app.get('/remove-med', function(req, res){
		shoppingCart.removeMed();
		
		res.redirect('/')
	});
	
	app.get('/remove-large', function(req, res){
		shoppingCart.removeLarge();
			
			res.redirect('/') 
	});
	
	
	app.get('/buy-small', function(req, res){
		shoppingCart.buySmall();
	
			res.redirect('/')
	});
	
	app.get('/buy-med', function(req, res){
		shoppingCart.buyMed();
	
			res.redirect('/')
	});
	
	app.get('/buy-large', function(req, res){
		shoppingCart.buyLarge();
	
			res.redirect('/')
	}); 
	  

    app.post('/count', function(req, res) {
	    //console.log(req.body.size)
	    counter++;
	    //shoppingCart.orderPizza();
	        res.redirect('/')
	
});

const PORT =  process.env.PORT || 3017;
// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});