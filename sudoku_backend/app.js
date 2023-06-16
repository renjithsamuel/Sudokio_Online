const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

// Import app routes from controller
const sudokuRoutes = require('./routes/sudokuRoutes');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin:'*'
}));

const mongoDBString = `mongodb+srv://ranjithsamuelking:Samking123@cluster0.gp8dend.mongodb.net/sudokio?retryWrites=true&w=majority`;
mongoose.connect(mongoDBString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{console.log('connected');}).catch((err)=>{console.log(err);})

// applying routes
app.get('/api/v1/health',(req,res,next)=>{
    return res.send("app is working prefectly!");
})
app.use('/api/v1', sudokuRoutes);

const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log('App is listening to' , port);
})