const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


const path = require('path');

// initializaciones
const app = express();

// Settings definitions
const port = process.env.PORT || 4000;

//handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}).engine);
app.set('view engine', '.hbs');

// middelwares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// variables globales
app.use((req, res, next) => {
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/autentication'));
app.use('/users', require('./routes/users'));


// public 
app.use(express.static(path.join(__dirname, 'public'))); 

// start server
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});