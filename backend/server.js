const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
const userRouter = require('./routes/users');
const employeeRouter = require('./routes/employees');
app.use('/api/users', userRouter);
app.use('/api/employees', employeeRouter);

const SERVER_PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    UseUnifiedTopology: true
}).then(() => {
    console.log("You are now connected to the mongoDB");
    app.listen(SERVER_PORT, ()=>{
        console.log(`Server is listening on ${SERVER_PORT}`)
    });
}).catch(e=>{
    console.log('Could not connect to the database', e)
    process.exit
})

app.use((err, req, res, next) => {
    console.error(e);
    res.status(500).send('Something went wrong!')
});
app.get('/', (req,res) =>{
    res.send("<h1>Niall Whyte 101377899</h1>")
})
