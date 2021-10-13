const express = require('express');
const exphbs  = require('express-handlebars');
let bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
//const PizzaCart = require('./js/functions')
const UserCounter = require('./js/userName')

const app = express();
//const theCart = PizzaCart();
const theUser = UserCounter();
//let theCart = ''

var hbs = exphbs.create({
	layoutsDir : './views/layouts',
	partialsDir : './views/partials',
	helpers: {}
});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');
 
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// open({
// 	filename: './orders.db',
// 	driver: sqlite3.Database
// }).then(async function (db) {

	// run migrations

	//await db.migrate();

	// only setup the routes once the database connection has been established
	
	//})
	
	app.get('/', function(req, res){

		res.render('index', {
			layouts: 'main',
        	qty: req.session.qty,
			price: req.session.priceUpdate,
			messageContent: req.session.messageContent,
			messageClass: req.session.messageClass,
			checkOut: req.session.checkOut,
			payOut: req.session.payOut,
			messageHide: req.session.messageHide,
		});
	});
	
	app.post('/cart', function (req, res) {
		const theCart = theUser.getUsername(req.session.id);
	
		theCart.BtnClicked(req.body.size);
		req.session.qty = theCart.qtyUpdate();
		req.session.priceUpdate = theCart.priceUpdate();
		req.session.cartTotal = theCart.priceUpdate().totalCart;
	
		if (req.session.cartTotal == 0) {
			req.session.checkOut = 'hidden';
		} else {
			req.session.checkOut = ' ';
		}
	
		res.redirect('/');
	});

	app.post('/checkout', function(req, res){
		req.session.checkOut = 'hidden';
    	req.session.payOut = ' ';

		res.redirect('/');
	});
	
	app.post('/pay', function (req, res) {
		const theCart = theUser.getUsername(req.session.id);
		req.session.calculateChange = theCart.calculateChange(req.body.payAmt);
		req.session.change = theCart.change();
	
		if (req.session.change < 0) {
			req.session.payOut = ' ';
			req.session.messageHide = ' ';
		} else {
			req.session.checkOut = 'hidden';
			req.session.messageHide = ' ';
		}
	
		if (req.session.change == 0) {
			req.session.messageContent = "Enjoy your Pizza!";
		} else if (req.session.change > 0) {
			req.session.messageContent = "Enjoy your Pizza, here is your change R" + req.session.change;
		} else if (req.session.change < 0) {
			req.session.messageContent = "Sorry, that is not enough money!";
		}
	
		if (req.session.change >= 0) {
			req.session.messageClass = '#FF758F';
		} else if (req.session.change < 0) {
			req.session.messageClass = '#FF8FA3';
		}
	
		// console.log(
		// 	'sessionID: ' + req.session.id + '\n' +
		// 	'Cart Total: ' + req.session.cartTotal + '\n' +
		// 	'Inputed Amt: ' + req.body.payAmt + '\n' +
		// 	'Change: ' + req.session.change + '\n'
		//);
	
		res.redirect('/');
	});

	app.post('/close', function (req, res) {
		const theCart = theUser.getUsername(req.session.id);
		 if (req.session.change < 0) {
			req.session.payOut = ' ';
			req.session.messageHide = 'hidden';
		} else {
			req.session.payOut = 'hidden';
			req.session.messageHide = 'hidden';
			req.session.cartReset = theCart.resetCart();
			req.session.qty = theCart.qtyUpdate();
			req.session.priceUpdate = theCart.priceUpdate();
		}
		res.redirect('/');
	});

	// app.get('/clear', function (req, res) {
	// 	const theCart = theUser.getUsername(req.session.id);
	// 	req.session.cartReset = theCart.resetCart();
	// 	req.session.qty = theCart.qtyUpdate();
	// 	req.session.priceUpdate = theCart.priceUpdate();
	// 	res.redirect('/');
	// })

const PORT =  process.env.PORT || 3017;
// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});