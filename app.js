// to load the modules
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

//init app
const app = express();

//setup body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuration for authentication
app.use(cookieParser());
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



//load files
const keys = require('./config/keys');

//load collections
const User = require('./models/user');

//connect to MongoDB
mongoose.connect(keys.MongoDB,()=> {
        console.log('MongoDB is connected ...');
    }).catch((err)=>{
    console.log(err);
});

//setup view engine
app.engine('handlebars',exphbs({
    defaultLayout: 'main'
}));
app.set('view engine','handlebars');

//connect client side to server css and js file
app.use(express.static('public'));

//create port
const port = process.env.PORT || 3000;


const Contact = require('./models/contact');

//handle home route
app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page'
    });
});

app.get('/cars',(req,res)=>{
    res.render('cars',{
        title: 'Cars'
    });


});

app.get('/contact',(req,res)=>{
    res.render('contact',{
        title: 'Contact Us'
    });
});
//save contact form data
app.post('/contact',(req,res) =>{
    console.log(req.body);
    const newContact = {
        email: req.body.email,
        name: req.body.name,
        message: req.body.message
    }
    new Contact(newContact).save((err,user)=>{
        //  if(err){
        //      throw err;
        //  }
        //  else{
            console.log('Message was received', user);
         //}
    });
});


app.get('/signup',(req,res)=>{
    res.render('SignUpForm',{
        title: 'Register'
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
;    //console.log('Server is up on port'+ port);
});
