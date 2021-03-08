const express = require('express');
const router = express.Router();
const usersAPI = require('./usersAPI');
const Joi = require('joi');

//database
const db = require('../database/database')

let usersData = usersAPI.usersData;

//Validaciones esquema usuario
const schema = Joi.object({
  fullname: Joi.string().min(5).required(),
  age :Joi.number().min(1).required(),
});

/* GET users listing. */
router.get('/users', async function(req, res, next) {
  const aux = await db.getUsers();
  // console.log("aux", aux);
  res.send(aux);
});

//Create user
router.post('/users',function(req, res){
  const {fullname, age} = req.body;
  const result = schema.validate({ fullname, age });
  if (result.error) return res.status(400).send(result.error.details[0].message);
  const user = usersAPI.add(fullname, age);
  console.log("Usuario añadido");
  res.send(user);
});

//Update user
router.put('/users/:id',function(req, res){
  const { id } = req.params;
  const { fullname, age} = req.body;
  const { user, err } = usersAPI.updateU(id, fullname, age);
  if (err) return next();
  console.log("Usuario actualizado")
  res.send(user);
});

//Delete cat
router.delete('/users/:id',function(req, res){
  const {id} = req.params;
  const user = usersAPI.deleteU(id)
  res.send(user);
});

module.exports = router;
