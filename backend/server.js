const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const User = require('./user').DB_URL;
const UserSchema = require('./schema')

const app = express();

app.use(express.json())

// mongoose.connect('mongodb+srv://gunamongouser:mondowntowngangsteR4@logincluster.vjvov.mongodb.net/RegisterDB?retryWrites=true&w=majority', 
//     {
//         userNewUrlParser: true,
//         useUnifiedTopology: true
//     },
//     () => {
//         console.log('Mongoose Is Connected')
//     }
// );


mongoose.connect(User);
mongoose.connection.on('open', () => {
    console.log('connected to mongoose')
})



app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(cookieParser('secretcode'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(expressSession({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}))

app.post('/register', async (req, res, next) => {
    // console.log(req.body.username)
    UserSchema.findOne({email: req.body.email}, async (err, doc) =>{
        try {
            console.log(doc)
            if (err) console.log(err);
            if (doc) {res.send('Already Registered')};
            if (!doc) {
                
                const NewUser = new UserSchema({
                    name: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
                const created = await NewUser.save()
                res.send(201)
            }
        } catch (err) {
            console.log(err)
        }
    })

    // const NewUser = new UserSchema({
    //     name: req.body.username,
    //     password: req.body.password
    // })
    // try {
    //     const created = await NewUser.save()
    //     res.send(201, req.body.username+' created successfully')
    // } catch (error) {
    //     res.send(404)
    // }
})

app.get('/login', (req, res, next) => {
    res.send('login')
});

app.post('/login', async (req, res, next) => {
    
    try{
        UserSchema.findOne({email: req.body.email}, async (err, doc) => {
            try {
                if (err) throw err;
                if (doc === null) {res.send('User Not Found')}
                if (doc.password == req.body.password){
                    await res.send(201)
                } else {
                    res.send('Wrong Password')
                }
            } catch (err) {
                res.send(err)
            }
        })
    } catch(err) {
       await res.send(err)
    }
})


app.listen(3001, ()=> {
    console.log('server started')
})


