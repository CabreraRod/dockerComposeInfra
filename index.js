const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');

app.use(express.json())



mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {useNewUrlParser: true});
mongoose.connection.once('open', function() {
  console.log("Connection Successful!");
});
mongoose.connection.on('error', err => {
  console.log(err);
  process.exit()
});

const cosasSchema = mongoose.Schema({
  nombre: String
});

const Cosa = mongoose.model('Cosa', cosasSchema, 'cosastore');

app.get('/api/cosas', async function (req, res) {
  res.json(await Cosa.find())
})

app.post('/api/cosas', function (req, res) {
  try {
    const data = {nombre: req.body.nombre}
    new Cosa(data).save();
    res.status(201).send({msj: req.body.nombre + " ha sido agregado"});

  } catch (error) {
    res.status(500).send({msj: error});
  }
  
})

app.listen(process.env.APP_PORT, function(){
  console.log(`Server Cosas is listening ${process.env.APP_PORT}`);
})